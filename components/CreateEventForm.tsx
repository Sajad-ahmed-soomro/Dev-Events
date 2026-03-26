// app/components/CreateEventForm.tsx
'use client';

import { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';

interface EventFormData {
  title: string;
  description: string;
  overview: string;
  venue: string;
  location: string;
  date: string;
  time: string;
  mode: 'in-person' | 'virtual' | 'hybrid';
  audience: string;
  agenda: string[];
  organizer: string;
  tags: string[];
  image: File | null;
}

interface FormErrors {
  [key: string]: string;
}

const TEST_DATA: EventFormData = {
  title: "Cloud Next 2029",
  description: "The premier cloud computing event of the year featuring the latest innovations",
  overview: "Join thousands of developers, architects, and cloud professionals for an immersive experience exploring next-gen cloud technologies, AI integration, and sustainable computing solutions",
  venue: "Moscone Center",
  location: "San Francisco, CA",
  date: "2025-04-10",
  time: "08:30",
  mode: "hybrid",
  audience: "Cloud engineers, DevOps professionals, developers, IT leaders, architects",
  agenda: [
    "08:30 AM - 09:30 AM | Keynote: The Future of Cloud Computing",
    "09:45 AM - 10:45 AM | AI Revolution: Transforming Cloud Services",
    "11:00 AM - 12:00 PM | Hands-on Workshop: Building Scalable Apps",
    "01:30 PM - 02:30 PM | Panel: Cloud Security Best Practices"
  ],
  organizer: "Google Cloud",
  tags: ["Cloud", "DevOps", "Kubernetes", "AI"],
  image: null
};

export default function CreateEventForm() {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<EventFormData>({
    title: '',
    description: '',
    overview: '',
    venue: '',
    location: '',
    date: '',
    time: '',
    mode: 'hybrid',
    audience: '',
    agenda: [''],
    organizer: '',
    tags: [''],
    image: null,
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const loadTestData = () => {
    setFormData(TEST_DATA);
    setErrors({});
    // Clear image preview for test data since it doesn't have an actual file
    setImagePreview(null);
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleArrayFieldChange = (
    field: 'agenda' | 'tags',
    index: number,
    value: string
  ) => {
    setFormData((prev) => {
      const updated = [...prev[field]];
      updated[index] = value;
      return { ...prev, [field]: updated };
    });
  };

  const addArrayFieldItem = (field: 'agenda' | 'tags') => {
    setFormData((prev) => ({
      ...prev,
      [field]: [...prev[field], ''],
    }));
  };

  const removeArrayFieldItem = (field: 'agenda' | 'tags', index: number) => {
    setFormData((prev) => ({
      ...prev,
      [field]: prev[field].filter((_, i) => i !== index),
    }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    
    if (file) {
      // Validate file type
      const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
      if (!validTypes.includes(file.type)) {
        setErrors((prev) => ({ ...prev, image: 'Please upload a valid image (JPG, PNG, or WEBP)' }));
        return;
      }
      
      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        setErrors((prev) => ({ ...prev, image: 'Image size must be less than 5MB' }));
        return;
      }
      
      setFormData((prev) => ({ ...prev, image: file }));
      
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
      
      if (errors.image) {
        setErrors((prev) => ({ ...prev, image: '' }));
      }
    }
  };

  const removeImage = () => {
    setFormData((prev) => ({ ...prev, image: null }));
    setImagePreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    if (errors.image) {
      setErrors((prev) => ({ ...prev, image: '' }));
    }
  };

  const selectNewImage = () => {
    fileInputRef.current?.click();
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.title.trim()) newErrors.title = 'Title is required';
    if (!formData.description.trim()) newErrors.description = 'Description is required';
    if (!formData.overview.trim()) newErrors.overview = 'Overview is required';
    if (!formData.venue.trim()) newErrors.venue = 'Venue is required';
    if (!formData.location.trim()) newErrors.location = 'Location is required';
    if (!formData.date) newErrors.date = 'Date is required';
    if (!formData.time) newErrors.time = 'Time is required';
    if (!formData.audience.trim()) newErrors.audience = 'Target audience is required';
    if (!formData.organizer.trim()) newErrors.organizer = 'Organizer is required';
    if (!formData.image) newErrors.image = 'Event image is required';

    const validAgenda = formData.agenda.filter(item => item.trim());
    if (validAgenda.length === 0) {
      newErrors.agenda = 'At least one agenda item is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const showThankYouMessage = (eventTitle: string) => {
    const toast = document.createElement('div');
    toast.className = 'fixed top-20 right-4 z-50 animate-slide-in';
    toast.innerHTML = `
      <div class="bg-gradient-to-r from-primary to-blue-500 text-black rounded-lg shadow-2xl p-4 max-w-md">
        <div class="flex items-start gap-3">
          <div class="flex-shrink-0">
            <i class="fas fa-check-circle text-2xl text-black"></i>
          </div>
          <div class="flex-1">
            <h3 class="font-bold text-lg mb-1">Event Created Successfully! 🎉</h3>
            <p class="text-sm text-black/80">Thank you for registering "${eventTitle}". Your event has been published.</p>
            <p class="text-xs mt-2 text-black/60">Redirecting to home page...</p>
          </div>
        </div>
      </div>
    `;
    document.body.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transition = 'opacity 0.3s ease';
      setTimeout(() => {
        if (document.body.contains(toast)) {
          document.body.removeChild(toast);
        }
      }, 300);
    }, 3000);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setErrors({});

    try {
      const submitData = new FormData();
      submitData.append('title', formData.title);
      submitData.append('description', formData.description);
      submitData.append('overview', formData.overview);
      submitData.append('venue', formData.venue);
      submitData.append('location', formData.location);
      submitData.append('date', formData.date);
      submitData.append('time', formData.time);
      submitData.append('mode', formData.mode);
      submitData.append('audience', formData.audience);
      submitData.append('organizer', formData.organizer);

      const validAgenda = formData.agenda.filter(item => item.trim());
      submitData.append('agenda', JSON.stringify(validAgenda));

      const validTags = formData.tags.filter(tag => tag.trim());
      submitData.append('tags', JSON.stringify(validTags));

      if (formData.image) {
        submitData.append('image', formData.image);
      }

      console.log('Submitting form data...');
      
      const response = await fetch('/api/events', {
        method: 'POST',
        body: submitData,
      });

      console.log('Response status:', response.status);
      
      if (!response.ok) {
        let errorMessage = `HTTP error! status: ${response.status}`;
        try {
          const errorData = await response.json();
          errorMessage = errorData.message || errorMessage;
        } catch (e) {
          console.error('Could not parse error response:', e);
          const text = await response.text();
          console.error('Raw response:', text);
          errorMessage = text || errorMessage;
        }
        throw new Error(errorMessage);
      }
      
      const responseText = await response.text();
      console.log('Response text:', responseText);
      
      if (!responseText || responseText.trim() === '') {
        throw new Error('Server returned an empty response');
      }
      
      let result;
      try {
        result = JSON.parse(responseText);
      } catch (e) {
        console.error('Failed to parse JSON:', e);
        throw new Error(`Invalid JSON response: ${responseText.substring(0, 100)}`);
      }

      console.log('Event created successfully:', result);
      
      const eventTitle = formData.title;
      showThankYouMessage(eventTitle);

      setTimeout(() => {
        router.push('/');
      }, 2000);
      
    } catch (error) {
      console.error('Error creating event:', error);
      setErrors((prev) => ({
        ...prev,
        submit: error instanceof Error ? error.message : 'Failed to create event. Please try again.',
      }));
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="text-gradient text-4xl sm:text-5xl font-semibold">
          Create New Event
        </h1>
        <p className="text-light-100 text-lg mt-3">
          Fill in the details below to create your event
        </p>
        
        <button
          type="button"
          onClick={loadTestData}
          className="mt-4 bg-blue-500/20 hover:bg-blue-500/30 text-blue-400 px-4 py-2 rounded-md text-sm transition-colors flex items-center gap-2"
        >
          <i className="fas fa-flask"></i>
          Load Test Data
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Basic Information Section */}
        <div className="bg-dark-100 border border-border-dark rounded-lg p-6 card-shadow">
          <h2 className="text-2xl font-bold text-white mb-4">Basic Information</h2>

          <div className="mb-5">
            <label htmlFor="title" className="block text-light-100 text-sm font-medium mb-2">
              Event Title *
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              placeholder="e.g., Cloud Next 2029"
              className={`w-full bg-dark-200 rounded-md px-4 py-2.5 text-white placeholder:text-light-200 focus:outline-none focus:ring-2 focus:ring-primary ${
                errors.title ? 'border-2 border-red-500' : ''
              }`}
            />
            {errors.title && <p className="text-red-400 text-sm mt-1">{errors.title}</p>}
          </div>

          <div className="mb-5">
            <label htmlFor="description" className="block text-light-100 text-sm font-medium mb-2">
              Short Description *
            </label>
            <textarea
              id="description"
              name="description"
              rows={3}
              value={formData.description}
              onChange={handleInputChange}
              placeholder="Brief description of the event"
              className={`w-full bg-dark-200 rounded-md px-4 py-2.5 text-white placeholder:text-light-200 focus:outline-none focus:ring-2 focus:ring-primary ${
                errors.description ? 'border-2 border-red-500' : ''
              }`}
            />
            {errors.description && <p className="text-red-400 text-sm mt-1">{errors.description}</p>}
          </div>

          <div className="mb-5">
            <label htmlFor="overview" className="block text-light-100 text-sm font-medium mb-2">
              Overview *
            </label>
            <textarea
              id="overview"
              name="overview"
              rows={4}
              value={formData.overview}
              onChange={handleInputChange}
              placeholder="Detailed overview of what attendees can expect"
              className={`w-full bg-dark-200 rounded-md px-4 py-2.5 text-white placeholder:text-light-200 focus:outline-none focus:ring-2 focus:ring-primary ${
                errors.overview ? 'border-2 border-red-500' : ''
              }`}
            />
            {errors.overview && <p className="text-red-400 text-sm mt-1">{errors.overview}</p>}
          </div>
        </div>

        {/* Location & Time Section */}
        <div className="bg-dark-100 border border-border-dark rounded-lg p-6 card-shadow">
          <h2 className="text-2xl font-bold text-white mb-4">Location & Time</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label htmlFor="venue" className="block text-light-100 text-sm font-medium mb-2">Venue *</label>
              <input type="text" id="venue" name="venue" value={formData.venue} onChange={handleInputChange}
                className="w-full bg-dark-200 rounded-md px-4 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-primary" />
            </div>
            <div>
              <label htmlFor="location" className="block text-light-100 text-sm font-medium mb-2">Location *</label>
              <input type="text" id="location" name="location" value={formData.location} onChange={handleInputChange}
                className="w-full bg-dark-200 rounded-md px-4 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-primary" />
            </div>
            <div>
              <label htmlFor="date" className="block text-light-100 text-sm font-medium mb-2">Date *</label>
              <input type="date" id="date" name="date" value={formData.date} onChange={handleInputChange}
                className="w-full bg-dark-200 rounded-md px-4 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-primary" />
            </div>
            <div>
              <label htmlFor="time" className="block text-light-100 text-sm font-medium mb-2">Time *</label>
              <input type="time" id="time" name="time" value={formData.time} onChange={handleInputChange}
                className="w-full bg-dark-200 rounded-md px-4 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-primary" />
            </div>
            <div>
              <label htmlFor="mode" className="block text-light-100 text-sm font-medium mb-2">Event Mode *</label>
              <select id="mode" name="mode" value={formData.mode} onChange={handleInputChange}
                className="w-full bg-dark-200 rounded-md px-4 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-primary">
                <option value="in-person">In-Person</option>
                <option value="virtual">Virtual</option>
                <option value="hybrid">Hybrid</option>
              </select>
            </div>
          </div>
        </div>

        {/* Audience & Organizer Section */}
        <div className="bg-dark-100 border border-border-dark rounded-lg p-6 card-shadow">
          <h2 className="text-2xl font-bold text-white mb-4">Audience & Organizer</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label htmlFor="audience" className="block text-light-100 text-sm font-medium mb-2">Target Audience *</label>
              <input type="text" id="audience" name="audience" value={formData.audience} onChange={handleInputChange}
                className="w-full bg-dark-200 rounded-md px-4 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-primary" />
            </div>
            <div>
              <label htmlFor="organizer" className="block text-light-100 text-sm font-medium mb-2">Organizer *</label>
              <input type="text" id="organizer" name="organizer" value={formData.organizer} onChange={handleInputChange}
                className="w-full bg-dark-200 rounded-md px-4 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-primary" />
            </div>
          </div>
        </div>

        {/* Agenda Section */}
        <div className="bg-dark-100 border border-border-dark rounded-lg p-6 card-shadow">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold text-white">Agenda</h2>
            <button type="button" onClick={() => addArrayFieldItem('agenda')}
              className="pill flex items-center gap-2 hover:bg-dark-200 transition-colors">
              <i className="fas fa-plus text-xs"></i> Add Agenda Item
            </button>
          </div>
          {errors.agenda && <p className="text-red-400 text-sm mb-3">{errors.agenda}</p>}
          <div className="space-y-3">
            {formData.agenda.map((item, index) => (
              <div key={index} className="flex gap-3 items-start">
                <input type="text" value={item} onChange={(e) => handleArrayFieldChange('agenda', index, e.target.value)}
                  placeholder="e.g., 09:00 AM - 10:00 AM | Keynote Session"
                  className="flex-1 bg-dark-200 rounded-md px-4 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-primary" />
                {formData.agenda.length > 1 && (
                  <button type="button" onClick={() => removeArrayFieldItem('agenda', index)}
                    className="text-red-400 hover:text-red-300 mt-2">
                    <i className="fas fa-trash-alt"></i>
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Tags Section */}
        <div className="bg-dark-100 border border-border-dark rounded-lg p-6 card-shadow">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold text-white">Tags</h2>
            <button type="button" onClick={() => addArrayFieldItem('tags')}
              className="pill flex items-center gap-2 hover:bg-dark-200 transition-colors">
              <i className="fas fa-plus text-xs"></i> Add Tag
            </button>
          </div>
          <div className="flex flex-wrap gap-3">
            {formData.tags.map((tag, index) => (
              <div key={index} className="flex items-center gap-2 bg-dark-200 rounded-md px-3 py-1.5">
                <input type="text" value={tag} onChange={(e) => handleArrayFieldChange('tags', index, e.target.value)}
                  placeholder="Tag"
                  className="bg-transparent text-white focus:outline-none w-24" />
                {formData.tags.length > 1 && (
                  <button type="button" onClick={() => removeArrayFieldItem('tags', index)}
                    className="text-red-400 hover:text-red-300">
                    <i className="fas fa-times"></i>
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Image Upload Section - UPDATED with remove and select new functionality */}
        <div className="bg-dark-100 border border-border-dark rounded-lg p-6 card-shadow">
          <h2 className="text-2xl font-bold text-white mb-4">Event Image</h2>
          
          <div className="flex flex-col gap-6">
            {/* Upload Area */}
            <div className="flex-1">
              <label className="block text-light-100 text-sm font-medium mb-2">
                Event Image *
              </label>
              
              <input
                ref={fileInputRef}
                type="file"
                accept="image/jpeg,image/jpg,image/png,image/webp"
                onChange={handleImageChange}
                className="hidden"
              />
              
              {!imagePreview ? (
                // No image selected - show upload button
                <div
                  onClick={selectNewImage}
                  className="w-full border-2 border-dashed border-border-dark rounded-lg p-8 text-center cursor-pointer hover:border-primary transition-colors bg-dark-200/30"
                >
                  <i className="fas fa-cloud-upload-alt text-4xl text-light-200 mb-3"></i>
                  <p className="text-light-100 mb-2">Click to upload an image</p>
                  <p className="text-light-200 text-xs">JPG, PNG, or WEBP (max 5MB)</p>
                </div>
              ) : (
                // Image selected - show preview with actions
                <div className="flex flex-col lg:flex-row gap-6 items-start">
                  <div className="relative">
                    <img 
                      src={imagePreview} 
                      alt="Event preview" 
                      className="w-48 h-48 object-cover rounded-lg border border-border-dark"
                    />
                    <div className="absolute top-2 right-2 flex gap-2">
                      <button
                        type="button"
                        onClick={removeImage}
                        className="bg-red-500 hover:bg-red-600 text-white rounded-full w-8 h-8 flex items-center justify-center transition-colors"
                        title="Remove image"
                      >
                        <i className="fas fa-trash-alt text-xs"></i>
                      </button>
                    </div>
                  </div>
                  
                  <div className="flex-1">
                    <p className="text-light-100 text-sm mb-3">
                      {formData.image?.name || 'Image selected'}
                    </p>
                    <button
                      type="button"
                      onClick={selectNewImage}
                      className="bg-dark-200 hover:bg-dark-200/80 text-light-100 px-4 py-2 rounded-md text-sm transition-colors flex items-center gap-2"
                    >
                      <i className="fas fa-exchange-alt"></i>
                      Select Different Image
                    </button>
                    <p className="text-light-200 text-xs mt-3">
                      Click to choose a different image
                    </p>
                  </div>
                </div>
              )}
              
              {errors.image && (
                <p className="text-red-400 text-sm mt-2">{errors.image}</p>
              )}
              <p className="text-light-200 text-xs mt-2">
                Recommended: 1200x630px, JPG, PNG, or WEBP format. Max 5MB.
              </p>
            </div>
          </div>
        </div>

        {errors.submit && (
          <div className="bg-red-500/10 border border-red-500 rounded-lg p-4">
            <p className="text-red-400">{errors.submit}</p>
          </div>
        )}

        <div className="flex gap-4 justify-end">
          <button type="button" onClick={() => router.back()}
            className="px-6 py-2.5 rounded-md border border-border-dark text-light-100 hover:bg-dark-100 transition-colors">
            Cancel
          </button>
          <button type="submit" disabled={isSubmitting}
            className="bg-primary hover:bg-primary/90 text-black font-semibold px-6 py-2.5 rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2">
            {isSubmitting ? (
              <><i className="fas fa-spinner fa-spin"></i> Creating...</>
            ) : (
              <><i className="fas fa-calendar-plus"></i> Create Event</>
            )}
          </button>
        </div>
      </form>

      <style jsx>{`
        @keyframes slideIn {
          from { transform: translateX(100%); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
        .animate-slide-in { animation: slideIn 0.3s ease-out; }
      `}</style>
    </div>
  );
}