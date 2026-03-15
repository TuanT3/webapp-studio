const SUPABASE_URL = "INCOLLA_https://zlqyqmsblobwelugqnij.supabase.coL";
const SUPABASE_KEY = "INCOLLA_LA_TUA_sb_publishable_thEIAybXnzRwz543iYtPSg_qAEQKw3z";

const client = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

async function loadContacts() {
  const { data, error } = await client
    .from("contacts")
    .select("*");

  console.log(data);
}

loadContacts();