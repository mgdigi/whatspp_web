import {users, liUser, listUser, nouveauBtn,form, inputNomC, inputActus,inputNumero, addUserBtn,groupeBtn,groupes, listGroupe, liGroupe, newGrpBtn, addGrpForm , userSelectionList,createGroupBtn,groupNameInput,listArchive, archiveBtn, errorMessage, msgBtn, rightContent, nomCU, etat, addMembreI, titre} from './consts.js'


let groupeSelectionne = null; 

export function hundleEvents(){
    document.getElementById("btnAddContactFromGroup").addEventListener("click", () => {
    addGrpForm.classList.add("hidden");  
    form.classList.remove("hidden");
});


nouveauBtn.addEventListener('click', () => {
    ajoutDepuisGroupe = false;
   form.classList.remove('hidden');
    nouveauBtn.classList.add('bg-green-400')
    listGroupe.classList.add('hidden')
    listUser.classList.add('hidden')
    newGrpBtn.classList.add('hidden')
    groupeBtn.classList.remove('bg-green-400')
    addGrpForm.classList.add('hidden')
    archiveBtn.classList.remove('bg-green-400')
    listArchive.classList.add('hidden')
    msgBtn.classList.remove('bg-green-400')
    titre.textContent = "Ajout utilisateur"
})

groupeBtn.addEventListener('click', () => {
    nouveauBtn.classList.remove('bg-green-400');
    groupeBtn.classList.add('bg-green-400');
    form.classList.add('hidden');

    listGroupe.classList.remove('hidden');
    listUser.classList.add('hidden');
    newGrpBtn.classList.remove('hidden');
    archiveBtn.classList.remove('bg-green-400');
    listArchive.classList.add('hidden');
    msgBtn.classList.remove('bg-green-400');
   
    addGrpForm.classList.add('hidden');
    titre.textContent = "Groupe";

})

msgBtn.addEventListener('click', () => {
    nouveauBtn.classList.remove('bg-green-400')
    msgBtn.classList.add('bg-green-400');
    form.classList.add('hidden');
    groupeBtn.classList.remove('bg-green-400');
    listUser.classList.remove('hidden');
    listGroupe.classList.add('hidden');
    newGrpBtn.classList.add('hidden');
    archiveBtn.classList.remove('bg-green-400');
    listArchive.classList.add('hidden');

    addGrpForm.classList.add('hidden');
    titre.textContent = "Message";

})

addUserBtn.addEventListener('click', (e) => {
    e.preventDefault();
    addUser()
     newGrpBtn.classList.add('hidden')
    msgBtn.classList.remove('bg-green-400');
    if(addUser()){
    
    }
    
});


newGrpBtn.addEventListener('click', () => {
    ajoutDepuisGroupe = true;
  showUsersCheckbox();
  addGrpForm.classList.remove('hidden');
  listGroupe.classList.add('hidden'); 
});

createGroupBtn.addEventListener('click', (e) => {
  e.preventDefault();

  if (groupeSelectionne) {
   
    const checkedUsers = Array.from(document.querySelectorAll('.checkbox-user:checked'));

    if (checkedUsers.length === 0) {
      alert("Veuillez sélectionner au moins deux membre !");
      return;
    }

    const nouveauxMembres = checkedUsers.map(cb => {
      const userId = parseInt(cb.value);
      return users.find(user => user.id === userId);
    });

    groupeSelectionne.membres.push(...nouveauxMembres);

    groupeSelectionne = null;
    groupNameInput.value = "";
    groupNameInput.disabled = false;
    createGroupBtn.textContent = "Créer groupe";

    addGrpForm.classList.add('hidden');
    listGroupe.classList.remove('hidden');


    listerGroupe();
  } else {
    addGroupe();
  }
});

archiveBtn.addEventListener('click', () => {
    archiveBtn.classList.add('bg-green-400');
    listUser.classList.add('hidden');
    groupeBtn.classList.remove('bg-green-400')
    listGroupe.classList.add('hidden')
    nouveauBtn.classList.remove('bg-green-400');
    form.classList.add('hidden');
    newGrpBtn.classList.add('hidden');
    addGrpForm.classList.add('hidden');
    listArchive.classList.remove('hidden');
    msgBtn.classList.remove('bg-green-400')

    listeArchive();
    titre.textContent = "discussions Archivés";
})
}