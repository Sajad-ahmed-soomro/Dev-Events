"use server"
import connectDB from "@/lib/mongodb";
import { NextRequest, NextResponse } from "next/server";
import Event from '@/database/event.model'
import cloudinary from "@/lib/cloudinary";
import { error } from "console";

export async function POST(req:NextRequest){
    try {
        await connectDB();
        const formData=await req.formData();
        let event;
        try {
            event=Object.fromEntries(formData.entries());
            console.log(event)

        } catch (e) {
            return NextResponse.json({message:'Invalid JSON data format'},{status:400});
            
        }
        const file=formData.get('image');
        if(!file) return NextResponse.json({message:'Image file is required'});
        if (!file || typeof file === "string") {
             return NextResponse.json({ message: "Invalid file" }, { status: 400 });
        }
        const arrayBuffer=await file.arrayBuffer();
        const buffer=Buffer.from(arrayBuffer);

        const uploadResult=await new Promise((resolve,reject)=>{
            cloudinary.uploader.upload_stream({resource_type:'image',folder:'DevEvents'},(error,result)=>{
                if(error) return reject(error);
                resolve(result);
            }).end(buffer)
        })
        event.image=(uploadResult as {secure_url:string}).secure_url

        const createdEvent=await Event.create(event);
        return NextResponse.json({message:'Event created successfully',event:createdEvent},{status:201});
    } catch (error) {
        console.log(error);
        return NextResponse.json({message:"Faild to create event"},{status:500});
    }
}

export async function GET(){

    try {
        await connectDB();
        const events=await Event.find().sort({createdAt:-1});

        return NextResponse.json({message:"Event fetched successfuly",events},{status:201},)

        
    } catch (e) {
        return NextResponse.json({message:"Event fetching failed ",error:e},{status:500})
    }

}