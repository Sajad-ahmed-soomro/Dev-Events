// app/api/events/route.ts
"use server"
import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Event from '@/database/event.model';
import cloudinary from '@/lib/cloudinary';


// POST handler - Create event
export async function POST(req: NextRequest) {
  try {
    await connectDB();
    
    // Parse form data
    const formData = await req.formData();
    
    // Extract all fields
    const title = formData.get('title') as string;
    const description = formData.get('description') as string;
    const overview = formData.get('overview') as string;
    const venue = formData.get('venue') as string;
    const location = formData.get('location') as string;
    const date = formData.get('date') as string;
    const time = formData.get('time') as string;
    const mode = formData.get('mode') as string;
    const audience = formData.get('audience') as string;
    const organizer = formData.get('organizer') as string;
    const agendaStr = formData.get('agenda') as string;
    const tagsStr = formData.get('tags') as string;
    const file = formData.get('image') as File | null;

    console.log('=== Received Form Data ===');
    console.log('Title:', title);
    console.log('Description:', description);
    console.log('Venue:', venue);
    console.log('Location:', location);
    console.log('Date:', date);
    console.log('Time:', time);
    console.log('Mode:', mode);
    console.log('Agenda String:', agendaStr);
    console.log('Tags String:', tagsStr);
    console.log('Has Image:', !!file);
    console.log('========================');

    // Validate required fields
    const requiredFields = { title, description, overview, venue, location, date, time, audience, organizer };
    const missingFields = Object.entries(requiredFields)
      .filter(([_, value]) => !value || value.trim() === '')
      .map(([key]) => key);
    
    if (missingFields.length > 0) {
      return NextResponse.json({
        success: false,
        message: `Missing required fields: ${missingFields.join(', ')}`
      }, { status: 400 });
    }

    // Parse agenda
    let agenda: string[] = [];
    if (agendaStr) {
      try {
        agenda = JSON.parse(agendaStr);
        if (!Array.isArray(agenda)) {
          agenda = [agendaStr];
        }
        // Filter out empty agenda items
        agenda = agenda.filter(item => item && item.trim() !== '');
        console.log('Parsed agenda:', agenda);
      } catch (e) {
        console.error('Error parsing agenda:', e);
        // If parsing fails, treat as single item
        agenda = [agendaStr];
      }
    }

    // Parse tags
    let tags: string[] = [];
    if (tagsStr) {
      try {
        tags = JSON.parse(tagsStr);
        if (!Array.isArray(tags)) {
          tags = [tagsStr];
        }
        // Filter out empty tags
        tags = tags.filter(tag => tag && tag.trim() !== '');
        console.log('Parsed tags:', tags);
      } catch (e) {
        console.error('Error parsing tags:', e);
        tags = [tagsStr];
      }
    }

    // Validate arrays have content
    if (agenda.length === 0) {
      return NextResponse.json({
        success: false,
        message: 'At least one agenda item is required'
      }, { status: 400 });
    }

    if (tags.length === 0) {
      return NextResponse.json({
        success: false,
        message: 'At least one tag is required'
      }, { status: 400 });
    }

    // Validate image
    if (!file || !(file instanceof File)) {
      return NextResponse.json({
        success: false,
        message: 'Event image is required'
      }, { status: 400 });
    }

    // Upload image to Cloudinary
    let imageUrl = '';
    try {
      const arrayBuffer = await file.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);
      
      console.log('Uploading image to Cloudinary...');
      
      const uploadResult = await new Promise((resolve, reject) => {
        cloudinary.uploader.upload_stream(
          { 
            resource_type: 'image', 
            folder: 'DevEvents',
            allowed_formats: ['jpg', 'png', 'webp', 'jpeg']
          },
          (error, result) => {
            if (error) {
              console.error('Cloudinary upload error:', error);
              reject(error);
            } else {
              resolve(result);
            }
          }
        ).end(buffer);
      });
      
      imageUrl = (uploadResult as { secure_url: string }).secure_url;
      console.log('Image uploaded successfully:', imageUrl);
      
    } catch (uploadError) {
      console.error('Image upload failed:', uploadError);
      return NextResponse.json({
        success: false,
        message: 'Failed to upload image. Please try again.'
      }, { status: 500 });
    }

    // Map mode to enum values
    let modeValue = '';
    if (mode === 'hybrid') modeValue = 'hybrid';
    else if (mode === 'virtual') modeValue = 'online';
    else if (mode === 'in-person') modeValue = 'offline';
    else modeValue = 'hybrid';

    // Prepare event data
    const eventData = {
      title: title.trim(),
      description: description.trim(),
      overview: overview.trim(),
      venue: venue.trim(),
      location: location.trim(),
      date,
      time,
      mode: modeValue,
      audience: audience.trim(),
      organizer: organizer.trim(),
      agenda,
      tags,
      image: imageUrl,
    };

    console.log('Creating event with data:', {
      ...eventData,
      agendaCount: agenda.length,
      tagsCount: tags.length
    });

    // Save to database
    const createdEvent = await Event.create(eventData);
    
    console.log('Event created successfully! ID:', createdEvent._id);
    
    return NextResponse.json({
      success: true,
      message: 'Event created successfully',
      event: createdEvent
    }, { status: 201 });
    
  } catch (error: any) {
    console.error('=== Error creating event ===');
    console.error(error);
    
    // Handle MongoDB validation errors
    if (error.name === 'ValidationError') {
      const validationErrors: { [key: string]: string } = {};
      Object.keys(error.errors).forEach((key) => {
        validationErrors[key] = error.errors[key].message;
      });
      
      return NextResponse.json({
        success: false,
        message: 'Validation failed',
        errors: validationErrors
      }, { status: 400 });
    }
    
    // Handle duplicate key error
    if (error.code === 11000) {
      return NextResponse.json({
        success: false,
        message: 'An event with this title already exists'
      }, { status: 409 });
    }
    
    return NextResponse.json({
      success: false,
      message: error.message || 'Failed to create event'
    }, { status: 500 });
  }
}

// OPTIONS handler for CORS if needed
export async function OPTIONS() {
  return NextResponse.json({}, {
    status: 200,
    headers: {
      'Allow': 'GET, POST, OPTIONS',
    },
  });
}
// app/api/events/route.ts
export async function GET(req: NextRequest) {
  try {
    
    await connectDB();
    
    const events = await Event.find().sort({ createdAt: -1 });
    
    return NextResponse.json(
      { 
        message: "Event fetched successfully", 
        events 
      }, 
      { status: 200 }
    );
    
  } catch (error) {
    console.error("=== GET Error Details ===");
    console.error(error);
    
    // Return more detailed error for debugging
    return NextResponse.json(
      { 
        message: "Event fetching failed", 
        error: error instanceof Error ? error.message : "Unknown error",
        stack: process.env.NODE_ENV === 'development' ? error instanceof Error ? error.stack : undefined : undefined
      }, 
      { status: 500 }
    );
  }
}