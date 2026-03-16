const SUPABASE_URL = "https://zlqyqmsblobwelugqnij.supabase.co";
const SUPABASE_KEY = "sb_publishable_thEIAybXnzRwz543iYtPSg_qAEQKw3z";

const client = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

const contactsList = document.getElementById("contactsList");
const saveButton = document.getElementById("saveContact");

async function loadContacts() {

  const { data, error } = await client
    .from("contacts")
    .select("*");

  contactsList.innerHTML = "";

  data.forEach(contact => {

    const li = document.createElement("li");

    li.textContent =
      contact.name + " - " + contact.email;

    contactsList.appendChild(li);

  });

}

saveButton.addEventListener("click", async () => {

  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const note = document.getElementById("note").value;

  await client
    .from("contacts")
    .insert([
      { name, email, note }
    ]);

  loadContacts();

});

loadContacts();