import {createClient} from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export async function uploadAvatar(image: File): Promise<string | undefined> {

    const supabase = createClient(supabaseUrl, supabaseKey);

    //save avatar
    const data = await supabase.storage.from("avatars").upload(`${image.name}_${Date.now()}`, image);

    const urlData = await supabase.storage.from("avatars").getPublicUrl(data.data?.path!);

    return urlData.data?.publicUrl
}

export async function uploadImages(images: File[]) {
    const supabase = createClient(supabaseUrl, supabaseKey);

    //save property images
    const uploadResults = await Promise.all(images.map(async (image) => {
        const { data, error } = await supabase.storage
            .from("propertyImages")
            .upload(`${image.name}_${Date.now()}`, image);

        if (error) {
            console.error('Error uploading image:', error);
            return null; // Handle error as needed
        }

        return data; // Return the data object containing the path
    }));

    // Extract URLs
    const urls = uploadResults.map(item => {
        if (item) {
            return supabase.storage
                .from("propertyImages")
                .getPublicUrl(item.path).data.publicUrl;
        }
        return null;
    });

    return urls;
}