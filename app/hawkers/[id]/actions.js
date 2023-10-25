"use server";

import { revalidatePath } from "next/cache";
import {supabase} from "../utils/supabase";



export async function addFav(data) {

  const { error } = await supabase
  .from('favourites')
  .insert({ user_id: 5, hawker_id: 8 })

  revalidatePath("/hawkers");
}