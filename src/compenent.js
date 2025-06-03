import {users, liUser, listUser, nouveauBtn,form, inputNomC, inputActus,inputNumero,
     addUserBtn,groupeBtn,groupes, listGroupe, liGroupe, newGrpBtn, addGrpForm , 
     userSelectionList,createGroupBtn,groupNameInput,listArchive, archiveBtn, 
      msgBtn, rightContent, nomCU, etat, addMembreI, titre, inputMessage, sendMsgbtn, 
       deleteMembreI, removeMembre,removeMembreBtn, marquerAdmin, marquerAdminBtn,
        loginForm, connecteBtn, container, disconnectbtn, adminBtn,
        diffusionBtn} from './consts.js'

    const searchInput = document.querySelector(".search");


let id = 0;
let groupeSelectionne = null; 
let ajoutDepuisGroupe = false;

connecteBtn.addEventListener('click', (e)=> {
    e.preventDefault();
    
    const loginPhone = document.getElementById("loginPhone");
    const loginPassword = document.getElementById("loginPassword");
    const loginError = document.getElementById("loginError");


    const numero = loginPhone.value.trim();
    const password = loginPassword.value.trim();

    const user = users.find(u => u.numero === numero && u.password === password);

    if (user) {
        loginPhone.value = "";
        loginPassword.value = ""
           container.classList.remove('hidden');
            loginForm.classList.add('hidden')
    } else {
        loginError.classList.remove("hidden");
    }

})

disconnectbtn.addEventListener('click', () => {
     container.classList.add('hidden');
     loginForm.classList.remove('hidden');
})

document.getElementById("btnAddContactFromGroup").addEventListener("click", () => {
    addGrpForm.classList.add("hidden");  
    removeMembre.classList.add('hidden')

    form.classList.remove("hidden");
});

marquerAdminBtn.addEventListener('click', () => {
  const checkboxes = document.querySelectorAll('.mark-admin-checkbox');
  
  checkboxes.forEach(checkbox => {
    const userId = parseInt(checkbox.dataset.userId);
    const membre = groupeSelectionne.membres.find(m => m.id === userId);

    if (membre) {
      membre.is_admin = checkbox.checked;
    }
  });

 marquerAdmin.classList.add('hidden');
 listGroupe.classList.remove('hidden')
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
    removeMembre.classList.add('hidden')
    archiveBtn.classList.remove('bg-green-400')
    listArchive.classList.add('hidden')
    msgBtn.classList.remove('bg-green-400')
    titre.textContent = "Ajout utilisateur"
     diffusionBtn.classList.remove('bg-green-400')

})


initialiserBoutonDiffusion();

groupeBtn.addEventListener('click', () => {
    nouveauBtn.classList.remove('bg-green-400');
    groupeBtn.classList.add('bg-green-400');
    form.classList.add('hidden');
     diffusionBtn.classList.remove('bg-green-400')
    listGroupe.classList.remove('hidden');
    listUser.classList.add('hidden');
    newGrpBtn.classList.remove('hidden');
    archiveBtn.classList.remove('bg-green-400');
    listArchive.classList.add('hidden');
    msgBtn.classList.remove('bg-green-400');
   
    addGrpForm.classList.add('hidden');
    removeMembre.classList.add('hidden')

    titre.textContent = "Groupe";
    marquerAdmin.classList.add('hidden');


})

msgBtn.addEventListener('click', () => {
    nouveauBtn.classList.remove('bg-green-400')
    msgBtn.classList.add('bg-green-400');
    form.classList.add('hidden');
    groupeBtn.classList.remove('bg-green-400');
     diffusionBtn.classList.remove('bg-green-400')

    listUser.classList.remove('hidden');
    listGroupe.classList.add('hidden');
    newGrpBtn.classList.add('hidden');
    archiveBtn.classList.remove('bg-green-400');
    listArchive.classList.add('hidden');

    addGrpForm.classList.add('hidden');
    removeMembre.classList.add('hidden')

    titre.textContent = "Message";

})

sendMsgbtn.addEventListener('click', (e) => {
  e.preventDefault();
  const messageText = inputMessage.value.trim();
  if (!messageText) return;

  if (titre.textContent === "Difusion") {
    users.forEach(user => {
      if (user.selected && !user.archive) {
        if (!user.messages) user.messages = [];
        user.messages.unshift({
          text: messageText,
          heure: new Date().toLocaleString('fr-FR', {
            hour: '2-digit',
            minute: '2-digit',
           }),
        });
      }
    });
    inputMessage.value = "";
    users.forEach(user => user.selected = false);
    listerUser(); 
  } else {
    sendMsg(); 
  }
});


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
    removeMembre.classList.add('hidden')

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
    removeMembre.classList.add('hidden')

    listGroupe.classList.remove('hidden');


    listerGroupe();
  } else {
    addGroupe();
  }
});

removeMembreBtn.addEventListener('click', (e) => {
    e.preventDefault()
  const checkboxes = document.querySelectorAll('.checkbox-user-to-remove:checked');
  const idsASupprimer = Array.from(checkboxes).map(cb => parseInt(cb.value));

  if (idsASupprimer.length === 0) {
   
    return;
  }

  groupeSelectionne.membres = groupeSelectionne.membres.filter(membre => {
    return !idsASupprimer.includes(membre.id);
  });

  

  removeMembre.classList.add('hidden');
  listGroupe.classList.remove('hidden');

  listerGroupe(); 
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
    removeMembre.classList.add('hidden')
     diffusionBtn.classList.remove('bg-green-400')

    listArchive.classList.remove('hidden');
    msgBtn.classList.remove('bg-green-400')

    listeArchive();
    titre.textContent = "discussions Archivés";
})

function formaterNomComplet(nom) {
  return nom
    .toLowerCase()  
    .split(' ')                        
    .filter(part => part.trim() !== '') 
    .map(part => part[0].toUpperCase() + part.slice(1)) 
    .join(' '); 
}


searchInput.addEventListener("input", () => {
  const query = searchInput.value.trim().toLowerCase();

  let filteredUsers = [];

  if (query === "*") {
    filteredUsers = [...users].sort((a, b) => a.nom_complet.localeCompare(b.nom_complet));
  } else if (query !== "") {
    filteredUsers = users.filter(user =>
      user.nom_complet.toLowerCase().includes(query) ||
      user.numero.includes(query)
    );
  } else {
    
    filteredUsers = [...users];
  }

  listerUser(filteredUsers); 
});



let modeDiffusion = false;
let contactsSelectionnes = []; 

export function listerUser(){
  listUser.innerHTML = "";

  users.forEach((user, i) => {
    const newLi = liUser.cloneNode(true);
         
    const nomUser = newLi.querySelector('.content h1');
    nomUser.textContent = `${user.nom_complet}`;
     
    const message = newLi.querySelector('.content p');
    
   
    if (user.brouillon && user.brouillon.trim() !== "") {
      message.textContent = `Brouillon: ${user.brouillon}`;
      message.style.fontStyle = "italic";
      message.style.color = "#666";
    } else if (user.messages && user.messages.length > 0) {
      const dernierMessage = user.messages[user.messages.length - 1];
      message.textContent = dernierMessage.text;
      message.style.fontStyle = "normal";
      message.style.color = "";
    } else {
      message.textContent = "Aucun message";
      message.style.fontStyle = "italic";
      message.style.color = "#999";
    }
     
    newLi.querySelector('.image h2').textContent = `${user.img}`;
     
    if (!user.archive) {
      listUser.appendChild(newLi);
 
      if (modeDiffusion) {
        if (contactsSelectionnes.includes(user)) {
          newLi.classList.add('bg-blue-300'); 
        }
      } else if (user.selected) {
        newLi.classList.add('bg-green-300');
      }
    }
     
    newLi.addEventListener('click', () => {
      if (modeDiffusion) {
        gererSelectionDiffusion(user, newLi);
      } else {
        gererSelectionNormale(user, newLi, i);
      }
    });
  });
  
  mettreAJourInterfaceDiffusion();
}

function gererSelectionDiffusion(user, element) {
  const index = contactsSelectionnes.findIndex(contact => contact === user);
  
  if (index > -1) {
    contactsSelectionnes.splice(index, 1);
    element.classList.remove('bg-blue-300');
  } else {
    contactsSelectionnes.push(user);
    element.classList.add('bg-blue-300');
  }
  
  mettreAJourInterfaceDiffusion();
}

function gererSelectionNormale(user, element, index) {
  // 🔁 Désactiver le mode diffusion
  if (modeDiffusion) {
    modeDiffusion = false;
    contactsSelectionnes = [];
  }

  // Sauvegarder le brouillon de l'ancien utilisateur
  const previousUser = users.find(u => u.selected);
  if (previousUser) {
    previousUser.brouillon = inputMessage.value.trim();
  }

  // Réinitialiser les sélections
  users.forEach(u => u.selected = false);
  user.selected = true;

  // Mettre à jour l'affichage
  document.querySelectorAll('.bg-green-300').forEach(el => {
    el.classList.remove('bg-green-300');
  });

  element.classList.add('bg-green-300');

  etat.textContent = `${user.etat}`;
  nomCU.textContent = `${user.nom_complet}`;
  rightContent.querySelector('.img p').textContent = `${user.img}`;
  inputMessage.value = user.brouillon || "";

  listerMsg(user);
  mettreAJourInterfaceDiffusion(); // pour nettoyer l'affichage de diffusion s’il y avait
  
  // Gérer le bouton archiver
  const archiverBtn = rightContent.querySelector('.archiver');
  archiverBtn.onclick = () => {
    archiverContact(index);
    rightContent.querySelector('.img p').textContent = "";
    rightContent.querySelector('.archiver').onclick = null;
    user.selected = false;
    element.classList.remove('bg-green-300');
    etat.textContent = "";
    nomCU.textContent = "";
    inputMessage.value = "";
    const messagesContainer = rightContent.querySelector('.messages-container');
    messagesContainer.innerHTML = "";
  };
}


// function gererSelectionNormale(user, element, index) {
//   const previousUser = users.find(u => u.selected);
//   if (previousUser) {
//     previousUser.brouillon = inputMessage.value.trim();
//   }
  
//   users.forEach(u => u.selected = false);
  
//   user.selected = true;
  
//   document.querySelectorAll('.bg-green-300').forEach(el => {
//     el.classList.remove('bg-green-300');
//   });
  
//   element.classList.add('bg-green-300');
  
//   etat.textContent = `${user.etat}`;
//   nomCU.textContent = `${user.nom_complet}`;
//   rightContent.querySelector('.img p').textContent = `${user.img}`;
  
//   inputMessage.value = user.brouillon || "";
  
//   listerMsg(user);
  
//   const archiverBtn = rightContent.querySelector('.archiver');
//   archiverBtn.onclick = () => {
//     archiverContact(index);
//     rightContent.querySelector('.img p').textContent = "";
//     rightContent.querySelector('.archiver').onclick = null;
//     user.selected = false;
//     element.classList.remove('bg-green-300');
//     etat.textContent = "";
//     nomCU.textContent = "";
//     inputMessage.value = "";
//     const messagesContainer = rightContent.querySelector('.messages-container');
//     messagesContainer.innerHTML = "";
//   };
// }

function toggleModeDiffusion() {
  modeDiffusion = !modeDiffusion;
  
  if (modeDiffusion) {
    contactsSelectionnes = [];
   
    users.forEach(u => u.selected = false);
 
    viderInterfaceConversation();
  } else {
 
    contactsSelectionnes = [];
    desactiverModeDiffusion();
  }
  

  listerUser();
}

function viderInterfaceConversation() {
  etat.textContent = "";
  nomCU.textContent = "";
  rightContent.querySelector('.img p').textContent = "";
  inputMessage.value = "";
  const messagesContainer = rightContent.querySelector('.messages-container');
  messagesContainer.innerHTML = "";
}

function mettreAJourInterfaceDiffusion() {
  if (modeDiffusion) {
    if (contactsSelectionnes.length > 0) {
      nomCU.textContent = `Diffusion (${contactsSelectionnes.length} contacts)`;
      etat.textContent = contactsSelectionnes.map(contact => contact.nom_complet).join(', ');
      rightContent.querySelector('.img p').textContent = "📢"; 
    } else {
      nomCU.textContent = "Mode diffusion - Sélectionnez des contacts";
      etat.textContent = "";
      rightContent.querySelector('.img p').textContent = "📢";
    }
    
    const messagesContainer = rightContent.querySelector('.messages-container');
    messagesContainer.innerHTML = "";
  }
}

function sendMsg() {
  const messageText = inputMessage.value.trim();
  if (!messageText) return;

  const now = new Date();
  const heures = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;

  if (modeDiffusion && contactsSelectionnes.length > 0) {
    contactsSelectionnes.forEach(contact => {
      const nouveauMessage = {
        text: messageText,
        heure: heures
      };
      
      contact.messages.push(nouveauMessage);
      contact.brouillon = "";
    });
    
    afficherConfirmationDiffusion(contactsSelectionnes.length);
    
    modeDiffusion = false;
    contactsSelectionnes = [];
    listerUser();
    viderInterfaceConversation();
    
  } else {
    const groupeActif = groupes.find(g => g.selected);
    const userActif = users.find(u => u.selected);

    if (groupeActif) {
      const nouveauMessage = {
        author: "Moi",
        text: messageText,
        heure: heures
      };

      groupeActif.messages.push(nouveauMessage);
      groupeActif.dernier_message = `${nouveauMessage.author} : ${nouveauMessage.text}`;
      listerMsgGroupe(groupeActif);
      
      if (groupeActif.brouillon) {
        groupeActif.brouillon = "";
      }

    } else if (userActif) {
      const nouveauMessage = {
        text: messageText,
        heure: heures
      };

      userActif.messages.push(nouveauMessage);
      listerMsg(userActif);
      userActif.brouillon = "";
      listerUser();
    }
  }

  inputMessage.value = "";
}

function afficherConfirmationDiffusion(nombreContacts) {
  const messagesContainer = rightContent.querySelector('.messages-container');
  messagesContainer.innerHTML = `
    <div class="confirmation-diffusion p-4 bg-green-100 rounded-lg text-center">
      <p class="text-green-800">✅ Message envoyé à ${nombreContacts} contact(s)</p>
    </div>
  `;
  
  setTimeout(() => {
    messagesContainer.innerHTML = "";
  }, 3000);
}

function sauvegarderBrouillon() {
  if (!modeDiffusion) {
    const userActif = users.find(u => u.selected);
    if (userActif) {
      const nouveauBrouillon = inputMessage.value.trim();
      if (userActif.brouillon !== nouveauBrouillon) {
        userActif.brouillon = nouveauBrouillon;
        mettreAJourAffichageUtilisateur(userActif);
      }
    }
  }
}

function mettreAJourAffichageUtilisateur(user) {
  const userElements = listUser.querySelectorAll('li');
  const userIndex = users.findIndex(u => u === user);
  
  if (userElements[userIndex]) {
    const messageElement = userElements[userIndex].querySelector('.content p');
    
    if (user.brouillon && user.brouillon.trim() !== "") {
      messageElement.textContent = `Brouillon: ${user.brouillon}`;
      messageElement.style.fontStyle = "italic";
      messageElement.style.color = "#666";
    } else if (user.messages && user.messages.length > 0) {
      const dernierMessage = user.messages[user.messages.length - 1];
      messageElement.textContent = dernierMessage.text;
      messageElement.style.fontStyle = "normal";
      messageElement.style.color = "";
    } else {
      messageElement.textContent = "Aucun message";
      messageElement.style.fontStyle = "italic";
      messageElement.style.color = "#999";
    }
  }
}

function listerMsg(user){
  const messagesContainer = rightContent.querySelector('.messages-container');
  messagesContainer.innerHTML = "";
      
  user.messages.forEach(message => {
    const messageCard = document.createElement('div');
    messageCard.className = "card-message flex justify-end mb-2";

    const content = document.createElement('div');
    content.className = "content-message flex flex-col max-w-xs bg-green-500 text-white p-3 rounded-2xl shadow";

    const text = document.createElement('p');
    text.className = "text-sm";
    text.textContent = message.text;

    const heure = document.createElement('span');
    heure.className = "text-right text-[10px] text-white/80 mt-1";
    heure.textContent = message.heure;

    content.appendChild(text);
    content.appendChild(heure);
    messageCard.appendChild(content);
    messagesContainer.appendChild(messageCard);
  });
}

function initialiserEvenements() {
  sendMsgbtn.addEventListener('click', (e) => {
    e.preventDefault();
    sendMsg();
  });
  
  let timeoutId;
  inputMessage.addEventListener('input', () => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(sauvegarderBrouillon, 700);
  });
  
  inputMessage.addEventListener('blur', sauvegarderBrouillon);
}

function initialiserBoutonDiffusion() {
  diffusionBtn.addEventListener('click', (e) => { 
    e.preventDefault(); 
    
    modeDiffusion = true;
    contactsSelectionnes = [];
    
    diffusionBtn.classList.add('bg-green-400');
    listGroupe.classList.add('hidden');
    listUser.classList.remove('hidden');
    newGrpBtn.classList.add('hidden');
    groupeBtn.classList.remove('bg-green-400');
    addGrpForm.classList.add('hidden');
    removeMembre.classList.add('hidden');
    archiveBtn.classList.remove('bg-green-400');
    listArchive.classList.add('hidden');
    msgBtn.classList.remove('bg-green-400');
    nouveauBtn.classList.remove('bg-green-400');
    form.classList.add('hidden');
    titre.textContent = "Diffusion";
    
    users.forEach(u => u.selected = false);
    
    viderInterfaceConversation();
    
    listerUser();
  });
}

function desactiverModeDiffusion() {
  modeDiffusion = false;
  contactsSelectionnes = [];
  
  diffusionBtn.classList.remove('bg-green-400');
}



initialiserEvenements();

export function listeArchive(){
  listArchive.innerHTML = ""
  users.forEach((user, i) => {
    const newLi = liUser.cloneNode(true);
    
    const nomUser  =  newLi.querySelector('.content h1');
     nomUser.textContent = `${user.nom_complet}`;

      const numero = newLi.querySelector('.content p');
    numero.textContent = `${user.messages[0].text}`;

     newLi.querySelector('.image h2').textContent = `${user.img}`;

    if(user.archive){
    listArchive.appendChild(newLi);
    }

     newLi.addEventListener('click', () =>{
        user.selected = !user.selected;
        if(user.selected){
            newLi.classList.add('bg-green-300'); 
            etat.textContent = `${user.etat}`;

        nomCU.textContent = `${user.nom_complet}`;

        rightContent.querySelector('.img p').textContent = `${user.img}`;
            const archiverBtn = rightContent.querySelector('.archiver');
            archiverBtn.onclick = () => {
            archiverContact(i);  
            rightContent.querySelector('.img p').textContent = "";
            rightContent.querySelector('.archiver').onclick = null;
         };
         listerMsg(user);

        }else{
            etat.textContent = "";
            nomCU.textContent = "";
            newLi.classList.remove('bg-green-300');  
            rightContent.querySelector('.img p').textContent = "";
            rightContent.querySelector('.archiver').onclick = null; 
        }  
              
     })
  })
  
}

function isValideNumero(valeur) {
  const regex = /^\d{8,15}$/;
  return regex.test(valeur);
}

function numeroExisteDeja(numero) {
  return users.some(user => user.numero === numero);
}

function nameExist(nom) {
    return users.some(user => user.nom_complet === nom);
}


function generateUniqueNumber(nom) {
    let suffixe = 1;
    let nouveauNom = nom;
    while (nameExist(nouveauNom)) {
        nouveauNom = nom + suffixe;
        suffixe++;
    }
    return nouveauNom;
}

function getInitiales(nomComplet) {
  const parties = nomComplet.trim().toLowerCase().split(' ').filter(Boolean);
  if (parties.length >= 2) {
    return (
      parties[0][0].toUpperCase() + 
      parties[1][0].toUpperCase()
    );
  } else if (parties.length === 1) {
    return parties[0][0].toUpperCase(); 
  }
  return "";
}


function addUser() {

    let nomComplet = formaterNomComplet(inputNomC.value.trim());
    const actus = inputActus.value.trim();
    const numero = inputNumero.value.trim();

    if (!nomComplet) {
        showError(inputNomC, "ce champ est requis!");
        return;
    }else if(!actus){
        showError(inputActus, "ce champ est obligatoire !");
        return;
    }else if(!numero){
        showError(inputNumero, "ce champ est obligatoire !");
        return;
    } else if (!isValideNumero(numero)) {
        showError(inputNumero, "Le numero n'est pas valide!");
        return;
    }else if (numeroExisteDeja(numero)) {
        showError(inputNumero, "Le numero existe deja !");
        return;
    } else {
        nomComplet = generateUniqueNumber(nomComplet);
        id++;
        const user = {
            id: id,
            nom_complet: nomComplet,
            actus: actus,
            numero: numero,
            img: getInitiales(nomComplet),
            archive: false,
            selected: false,
            etat: "en ligne"
        };
        users.unshift(user);
        console.table(users);
        listerUser();

        inputNomC.value = "";
        inputActus.value = "";
        inputNumero.value = "";
        nouveauBtn.classList.remove('bg-green-400')

        form.classList.add('hidden');
        if(ajoutDepuisGroupe){
      document.getElementById("addGrpForm").classList.remove("hidden");
        updateListeSelectionUsers();
         const lastUserId = users[0]?.id;
        const checkbox = document.querySelector(`.checkbox-user[value="${lastUserId}"]`);
        if (checkbox) {
            checkbox.checked = true;
        }
    }else{
        listUser.classList.remove('hidden');
    }
    }
}

export function listerGroupe(){
  listGroupe.innerHTML = ""
  groupes.forEach(groupe => {
    const newLi = liGroupe.cloneNode(true);
    
    const nomGroupe  =  newLi.querySelector('.content h1');
     nomGroupe.textContent = `${groupe.nom}`;

     const dernierMessage =  newLi.querySelector('.content p');
     dernierMessage.textContent = `${groupe.dernier_message}`;

     newLi.querySelector('.date').textContent =   `${groupe.date}`;

     const messages = newLi.querySelector('.messages');
     messages.textContent = `${groupe.dernier_message}`
    
     listGroupe.appendChild(newLi);


    newLi.addEventListener('click', () =>{
        groupe.selected = !groupe.selected;
        if(groupe.selected){
            newLi.classList.add('bg-green-300'); 

        nomCU.textContent = `${groupe.nom}`;

        rightContent.querySelector('.img p').textContent = `${groupe.img}`;
            etat.textContent = "membre du groupe : " + groupe.membres.map((membre) => `${membre.nom_complet}`);
            addMembreI.classList.remove('hidden');

            sendMsgbtn.addEventListener('click', (e) => {
              e.preventDefault();
                sendMsg() 
            })
        listerMsgGroupe(groupe)

       
        addMembreI.onclick = (e) => {
            e.preventDefault();
            ajouterMembresAuGroupe(groupe);
        };

        deleteMembreI.onclick = (e) => {
            e.preventDefault();
            deleteMembreGroupe(groupe);
        }

        adminBtn.addEventListener('click', (e) => {
            e.preventDefault();
            console.log("clicked ")
            marquerMAdmin(groupe)
        })


        }else{
            etat.textContent = "";
            nomCU.textContent = "";
            newLi.classList.remove('bg-green-300');  
            rightContent.querySelector('.img p').textContent = "";
            addMembreI.classList.add('hidden');
            const messagesContainer = rightContent.querySelector('.messages-container');

             messagesContainer.innerHTML = "";


        }        
     })
  })
}



function listerMsgGroupe(groupe){
  const messagesContainer = rightContent.querySelector('.messages-container');
  messagesContainer.innerHTML = "";

  groupe.messages.forEach(message => {
    const messageCard = document.createElement('div');
    messageCard.className = "card-message flex justify-end mb-2";

    const content = document.createElement('div');
    content.className = "content-message flex flex-col max-w-xs bg-green-500 text-white p-3 rounded-2xl shadow";

    const aut = document.createElement('span');
    aut.className = 'text-xl text-gray-600 font-semibold'
    aut.textContent = `${message.author}`

    const text = document.createElement('p');
    text.className = "text-sm";
    text.textContent = `${message.text}`;

    const heure = document.createElement('span');
    heure.className = "text-right text-[10px] text-white/80 mt-1";
    heure.textContent = `${message.heure}`;
    
    content.appendChild(aut);
    content.appendChild(text);
    content.appendChild(heure);
    messageCard.appendChild(content);
    messagesContainer.appendChild(messageCard);
  });

  messagesContainer.scrollTop = messagesContainer.scrollHeight;
}


function showUsersCheckbox(utilisateurs = users) {
  userSelectionList.innerHTML = "";
  utilisateurs.forEach(user => {
    const div = document.createElement('div');
    div.className = "flex items-center space-x-5";

    div.innerHTML = `
      <input type="checkbox" value="${user.id}" class="checkbox-user accent-green-400">
      <label class="text-sm">${user.nom_complet} <span class="text-gray-700 text-xs">(${user.numero})</span></label>
    `;

    userSelectionList.appendChild(div);
  });

}

function addGroupe(){
   const nomGroupe = groupNameInput.value.trim();
  const checkedUsers = Array.from(document.querySelectorAll('.checkbox-user:checked'));

  if (!nomGroupe) {
    showError(groupNameInput, "Veuillez entrer le nom du groupe.");
    return;
  }

  else if (checkedUsers.length < 2) {
 
    showError(document.querySelector('.vide'), "vueillez selectionnez au moins deux membre !")
    return;
  }else{
 const membres = checkedUsers.map(cb => {
    const userId = parseInt(cb.value);
    return users.find(user => user.id === userId);
  });

  const nouveauGroupe = {
    id: groupes.length + 1,
    nom: nomGroupe,
    dernier_message: "",
    date : new Date().toLocaleString('fr-FR', {
            hour: '2-digit',
            minute: '2-digit',
           }),
    img: membres[0]?.img || 'src/img/pp-group.jpeg',
    messages: [],
    membres: membres
  };

  groupes.push(nouveauGroupe);
  groupNameInput.value = "";
  addGrpForm.classList.add('hidden');
  listerGroupe();
  listGroupe.classList.remove('hidden');
  console.table(groupes);
  } 
}

function archiverContact(i){
    users[i].archive = !users[i].archive;
    listerUser();
    listeArchive();
}



function showError(balise, msg) {

    const errorDiv = balise.parentElement.querySelector('.errorMessage');
    
    if (errorDiv) {
        const p = errorDiv.querySelector('p');
        errorDiv.classList.remove('hidden');
        balise.style.backgroundColor = '#ff4d6d';
        balise.style.borderLeft = "15px solid red";
        p.textContent = msg;
        p.style.color = 'red';

        setTimeout(() => {
            errorDiv.classList.add('hidden');
            balise.style.backgroundColor = 'white';
            balise.style.border = "1px solid black";
            p.textContent = '';
        }, 1000);
    } else {
        console.warn("Aucune div .errorMessage trouvée à proximité de l'input.");
    }
}


function ajouterMembresAuGroupe(groupe) {
  groupeSelectionne = groupe; 

  const usersNonMembres = users.filter(user => {
    return !groupe.membres.some(membre => membre.id === user.id);
  });
   
  if(usersNonMembres.length === 0){
        document.querySelector('.vide').textContent = 'Aucun utilisateur disponible !';
  }
 
  showUsersCheckbox(usersNonMembres);



  groupNameInput.value = groupe.nom;
  groupNameInput.disabled = true;
  createGroupBtn.textContent = "Ajouter membres";

  addGrpForm.classList.remove('hidden');
  listGroupe.classList.add('hidden');
}

function showUsersRemoveCheckbox(utilisateurs = users, isRemoveMode = false) {
  const container = isRemoveMode ? document.querySelector('#userSelectionList') : userSelectionList;

  container.innerHTML = "";
  utilisateurs.forEach(user => {
    const div = document.createElement('div');
    div.className = "flex items-center space-x-5";

    div.innerHTML = `
      <input type="checkbox" value="${user.id}" class="checkbox-user ${isRemoveMode ? 'accent-red-500' : 'accent-green-400'}">
      <label class="text-sm">${user.nom_complet} <span class="text-gray-700 text-xs">(${user.numero})</span></label>
    `;

    container.appendChild(div);
  });
}



function deleteMembreGroupe(groupe) {
  groupeSelectionne = groupe;

  const usersMembres = users.filter(user => {
    return groupe.membres.some(membre => membre.id === user.id);
  });

  const container = document.querySelector('#removeUserSelectionList');
  container.innerHTML = "";

  if (usersMembres.length === 0) {
    container.innerHTML = '<p class="text-red-700">Aucun membre à retirer.</p>';
  } else {
    usersMembres.forEach(user => {
      const div = document.createElement('div');
      div.className = "flex items-center space-x-5";

      div.innerHTML = `
        <input type="checkbox" value="${user.id}" class="checkbox-user-to-remove accent-red-500">
        <label class="text-sm">${user.nom_complet} <span class="text-gray-700 text-xs">(${user.numero})</span></label>
      `;

      container.appendChild(div);
    });
  }

  const groupNameInput = document.querySelector('#removeGrpForm #groupName');
  groupNameInput.value = groupe.nom;
  groupNameInput.disabled = true;

  removeMembre.classList.remove('hidden');
  listGroupe.classList.add('hidden');
}

function marquerMAdmin(groupe){
    groupeSelectionne = groupe;

  const usersMembres = users.filter(user => {
    return groupe.membres.some(membre => membre.id === user.id);
  });

  const container = document.querySelector('#AdminSelectionList');
  container.innerHTML = "";

  if (usersMembres.length === 0) {
    container.innerHTML = '<p class="text-red-700">Aucun membre à marquer admin.</p>';
  } else {
    usersMembres.forEach(user => {
  const div = document.createElement('div');
  div.className = "flex items-center space-x-5";

  div.innerHTML = `
    <input type="checkbox" class="mark-admin-checkbox accent-green-500" data-user-id="${user.id}" ${user.is_admin ? 'checked' : ''}>
    <label class="text-sm">${user.nom_complet} <span class="text-gray-700 text-xs">(${user.numero})</span></label>
  `;

  container.appendChild(div);
});

  }

  const groupNameInput = document.querySelector('#marquer-admin #groupName');
  groupNameInput.value = groupe.nom;
  groupNameInput.disabled = true;

  marquerAdmin.classList.remove('hidden');
  listGroupe.classList.add('hidden');
}


function updateListeSelectionUsers() {
    const container = document.getElementById('userSelectionList');
    container.innerHTML = '';

    users.forEach(user => {
        if (!user.archive) {
            const div = document.createElement('div');
            div.classList.add('flex', 'items-center', 'space-x-2');

            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.classList.add('checkbox-user');
            checkbox.value = user.id;

            const label = document.createElement('label');
            label.textContent = user.nom_complet;

            div.appendChild(checkbox);
            div.appendChild(label);
            container.appendChild(div);
        }
    });
}




