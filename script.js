const SUPABASE_URL = "https://zlqyqmsblobwelugqnij.supabase.co";
const SUPABASE_KEY = "sb_publishable_thEIAybXnzRwz543iYtPSg_qAEQKw3z";

const client = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

const button = document.getElementById("testButton");
const message = document.getElementById("message");

button.addEventListener("click", async () => {
  message.textContent = "Caricamento contatti...";

  const { data, error } = await client
    .from("contacts")
    .select("*");

  console.log("DATA:", data);
  console.log("ERROR:", error);

  if (error) {
    message.textContent = "Errore nel collegamento a Supabase.";
    return;
  }

  if (!data || data.length === 0) {
    message.textContent = "Nessun contatto trovato.";
    return;
  }

  message.textContent = `Trovati ${data.length} contatti. Guarda la console.`;
});