import { Injectable } from '@angular/core';
import { Buffer } from 'buffer';

@Injectable({
    providedIn: 'root'
})

export class Helpers {

    
    convertFileToBase64(file: File): Promise<string> {
        return new Promise((resolve, reject) =>{
            const reader = new FileReader();
            
            reader.readAsDataURL(file as Blob);
            reader.onloadend = () =>{ 
                const base64 = reader.result as string;
                resolve(base64)}; 
            reader.onerror = (error) => reject(error)
        
        });
    }

}