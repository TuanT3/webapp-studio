const SUPABASE_URL = "https://zlqyqmsblobwelugqnij.supabase.co";
const SUPABASE_KEY = "sb_publishable_thEIAybXnzRwz543iYtPSg_qAEQKw3z";

const client = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const noteInput = document.getElementById("note");
const saveButton = document.getElementById("saveContact");
const contactsList = document.getElementById("contactsList");
const statusMessage = document.getElementById("statusMessage");

function setStatus(message, isError = false) {
  statusMessage.textContent = message;
  statusMessage.style.color = isError ? "crimson" : "green";
}

function clearForm() {
  nameInput.value = "";
  emailInput.value = "";
  noteInput.value = "";
}

function renderContacts(data) {
  contactsList.innerHTML = "";

  if (!data || data.length === 0) {
    contactsList.innerHTML = "<li>Nessun contatto presente.</li>";
    return;
  }

  data.forEach((contact) => {
    const li = document.createElement("li");
    li.className = "contact-item";

    li.innerHTML = `
      <div class="contact-name">${contact.name ?? ""}</div>
      <div class="contact-meta">${contact.email ?? ""}</div>
      <div class="contact-note">${contact.note ?? ""}</div>
      <button class="delete-btn" data-id="${contact.id}" type="button">Elimina</button>
    `;

    contactsList.appendChild(li);
  });
}

async function loadContacts() {
  setStatus("Caricamento contatti...");

  const { data, error } = await client
    .from("contacts")
    .select("*")
    .order("id", { ascending: false });

  console.log("LOAD DATA:", data);
  console.log("LOAD ERROR:", error);

  if (error) {
    setStatus("Errore nel caricamento dei contatti.", true);
    return;
  }

  renderContacts(data);
  setStatus(`Caricati ${data.length} contatti.`);
}

async function createContact() {
  const name = nameInput.value.trim();
  const email = emailInput.value.trim();
  const note = noteInput.value.trim();

  if (!name || !email) {
    setStatus("Nome ed email sono obbligatori.", true);
    return;
  }

  setStatus("Salvataggio in corso...");

  const { error } = await client
    .from("contacts")
    .insert([{ name, email, note }]);

  console.log("INSERT ERROR:", error);

  if (error) {
    setStatus(`Errore durante il salvataggio: ${error.message}`, true);
    return;
  }

  clearForm();
  setStatus("Contatto salvato correttamente.");
  await loadContacts();
}

async function deleteContact(id) {
  setStatus("Eliminazione in corso...");

  const { error } = await client
    .from("contacts")
    .delete()
    .eq("id", id);

  console.log("DELETE ERROR:", error);

  if (error) {
    setStatus(`Errore durante l'eliminazione: ${error.message}`, true);
    return;
  }

  setStatus("Contatto eliminato.");
  await loadContacts();
}

saveButton.addEventListener("click", async () => {
  await createContact();
});

contactsList.addEventListener("click", async (event) => {
  if (!event.target.classList.contains("delete-btn")) {
    return;
  }

  const id = Number(event.target.dataset.id);

  if (!id) {
    return;
  }

  const confirmed = window.confirm("Vuoi davvero eliminare questo contatto?");
  if (!confirmed) {
    return;
  }

  await deleteContact(id);
});

loadContacts();