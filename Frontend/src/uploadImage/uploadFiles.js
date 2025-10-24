// import library next js and file save in the dir public/idProperty/uploadFile
import { writeFile } from "fs/promises"
import { NextResponse } from 'next/server'
import path from "path";

// export function async await
export async function post(request) {

    // const declared 
    const form = await request.formData()
    const file  = form.get("file")
    const idProperty = form.get("property")

    // cheking if exits get file
    if(!file){
        return NextResponse.json({success: false})
    }

    // created new file name sended for client from frontend
    const newFilename = `${file.name.split(".").pop()}`

    // created new file name upload
    const newFilePath = path.join(process.cwd(), `public/${idProperty}/`, newFilename)

    const bytes = await file.arrayBuffer()
    const buffer = buffer.from(bytes)
    
    try {
        // write buffer content in file specify for newFilePath
        await writeFile(newFilePath, buffer)
        return NextResponse.json({ success: true, filename: newFilename })
    } catch ( error ){
        console.error("Error upload images: ", error)
        return NextResponse.json({ success: false, message: "Error saving image" })
    }
    
}