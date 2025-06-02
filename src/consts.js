const users = [
  {
    id: 1,
    nom_complet: "Mohamed Gueye",
    actus: "bonsoir j'utilise whatspp",
    numero: "780118223",
    img: 'MG',
    etat: 'en ligne',
    archive: false,
    selected: false,
    password: "passer",
    is_admin: false,
    brouillon: "",
    messages: [
        {
        text: "je suis seydina ",
        heure: '20: 18'
    },    
]
  },
  {
    id: 2,
    nom_complet: "Bilal Drame",
    actus: "Occupe ",
    numero: "764357898",
    img: 'BD',
    etat: 'en ligne',
    archive: false,
    selected: false,
    is_admin: false,

    messages: [
        {
        text: "je suis bilal ",
        heure: '20: 18'
    },
    {
        text: "je suis bilal 2",
        heure: '20: 18'
    }
]
  },
  {
    id: 3,
    nom_complet: "Bocar Ba",
    actus: "Disponible",
    numero: "784118225",
    img: 'BB',
    etat: 'en ligne',
    archive: false,
    selected: false,
    is_admin: false,

    messages: [
        {
        text: "je suis Bocar ",
        heure: '20: 18'
    }
]
  }
];

const groupes = [
   {
    id: 1,
    nom: "Dev Web et Mobile ODC",
    dernier_message: "coach aly : Tay Ngein deih dh ",
    img: 'DW',
    messages: [
        {
        author: "admin",
        text: "je suis le membre 2",
        heure: "19:02"
    }
],
    membres : [
        {
            nom_complet : 'seydina mohamed',
            numero : '780118223',
            actus: "je suis disponible !",
            is_admin : false
        }
    ],
    date: '19:02',
    etat: 'vu',
    selected: false
  },
]

const container = document.querySelector('.container');
const listUser =  document.getElementById('liste-users');
const listGroupe =  document.getElementById('liste-groupe');
const liUser = listUser.querySelector('li');
const liGroupe = listGroupe.querySelector('li');
const userSelectionList = document.getElementById('userSelectionList');
const listArchive = document.getElementById('liste-archive');
const errorMessage = document.querySelector('.errorMessage');

const form = document.querySelector('.form');
const addGrpForm = document.querySelector('#addGrpForm');
const loginForm = document.querySelector('#loginForm');

const inputNomC =  form.querySelector('.nom-complet');
const inputActus = form.querySelector('.actus');
const inputNumero = form.querySelector('.numero');
const groupNameInput = document.getElementById('groupName');
const inputMessage = document.querySelector('.send-message');

const addUserBtn = form.querySelector('form button');
const nouveauBtn = document.querySelector('.add-user');
const archiveBtn = document.querySelector('.archive-user');
const diffusionBtn = document.querySelector('.diffusion');
const groupeBtn = document.querySelector('.groupe-btn');
const msgBtn = document.querySelector('.msg-btn');
const newGrpBtn = document.querySelector('.new-groupe');
const createGroupBtn = document.getElementById('createGroupBtn');
const sendMsgbtn  =  document.querySelector('.send-message-btn');
const removeMembreBtn = document.querySelector('#btnRemoveSelectedMembres');
const connecteBtn = document.querySelector('.se-connecter');
const disconnectbtn = document.querySelector('.disconnect');

const rightContent = document.querySelector('.content-right');

const nomCU = rightContent.querySelector('.nom-user');
const etat = rightContent.querySelector('.etat');
const addMembreI = rightContent.querySelector('.add-membre');
const deleteMembreI = document.querySelector('.delete-membre');
const removeMembre = document.querySelector('#removeGrpForm')
const titre = document.querySelector('.titre');
const marquerAdmin = document.querySelector('#marquer-admin');
const marquerAdminBtn = document.querySelector('#btn-marquer-admin');
const adminBtn = document.querySelector('.admin')

const cardMsg = rightContent.querySelector('.card-message');
const contentMsg = rightContent.querySelector('.content-message');




export {users, groupes, listUser, listGroupe, liUser, liGroupe, nouveauBtn,
 form, inputNomC,inputActus,inputNumero, addUserBtn,archiveBtn,msgBtn,
 diffusionBtn,groupeBtn, newGrpBtn, addGrpForm, userSelectionList,createGroupBtn,
 groupNameInput, listArchive, errorMessage, rightContent, nomCU, etat, addMembreI,
 deleteMembreI, titre, inputMessage, sendMsgbtn, cardMsg , contentMsg, removeMembre,
  removeMembreBtn, loginForm, connecteBtn, container, disconnectbtn, marquerAdmin, marquerAdminBtn,
adminBtn};