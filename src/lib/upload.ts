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

export async function uploadBadge(image: File): Promise<string | undefined> {
    const supabase = createClient(supabaseUrl, supabaseKey);

    //save avatar
    const data = await supabase.storage.from("badges").upload(`${image.name}_${Date.now()}`, image);

    const urlData = await supabase.storage.from("badges").getPublicUrl(data.data?.path!);

    return urlData.data?.publicUrl
}