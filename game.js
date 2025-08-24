// =========================================================================================================================================
// ------------------------------------------------------------Monster Breeder - Core-------------------------------------------------------
// ==========================================================================================================================================

// ------------------------------------------------ CONSTANTE ET DATABASE-------------------------------------------------------------------

// ---- Constantes & réglages
const ENERGY_MAX = 50;
const ENERGY_REGEN_MS = 60000; // +1 énergie par minute
const GOLD_PER_RARITY = {
    'common': 10,
    'rare': 25,
    'epic': 50,
    'legendary': 100
};

const ITEM_SELL_VALUE = {
    'common': 5,
    'rare': 20,
    'epic': 100,
    'legendary': 500
};

const SPEED_STEPS = [1, 2, 4]; // vitesse de combat x1/x2/x4
const ATB_TICK_MS = 200; // tick base
const ATB_FILL_BASE = 3; // multiplicateur de remplissage par point de vitesse
const ATB_FULL = 100;
const MONSTER_SELL_RATE = 0.25; // Vente pour 25% de la valeur de base

const EGG_PROBABILITIES = {
  common: 0.70, // 70% de chance d'avoir un monstre commun pour l'oeuf mystère
  rare: 0.25,   // 25% de chance d'avoir un monstre rare
  epic: 0.05    // 5% de chance d'avoir un monstre épique
};

// ---------------------------------------------- CONSTANTE POUR LETYPE DE PETIT MONSTRE----------------------------------------------------------

const TYPE_ADV = { // Tableau des avantages simple par type
  eau: 'feu',
  feu: 'plante',
  plante: 'eau'
  // terre: neutre
};

function typeMultiplier(attType, defType){
  if(attType === 'terre' || defType === 'terre') return 1.0;
  if(TYPE_ADV[attType] === defType) return 1.5;       // avantage
  if(TYPE_ADV[defType] === attType) return 0.75;      // désavantage
  return 1.0;
}

// ---------------------------------------------------------- Base d'espèces (fixes)--------------------------------------------------------
// ------------------------------------------------------------Commun ()--------------------------------------------------------------------
const SPECIES = {
  common: [
    // Eau
    { id: 'gouttelette', name: 'Gouttelette', type: 'eau', rarity:'common', attack: 12, defense: 8, hp: 20, image: "image/Eau/gouttelette.png" },
    { id: 'nageur', name: 'Nageur', type: 'eau', rarity:'common', attack: 14, defense: 6, hp: 20, image: "image/Eau/nageur.png",},
    { id: 'blobdemer', name: 'Blob de Mer', type: 'eau', rarity:'common', attack: 11, defense: 9, hp: 20, image: "image/Eau/blobdemer.png" },
    { id: 'vaguejunior', name: 'Vague Junior', type: 'eau', rarity:'common', attack: 13, defense: 7, hp: 20, image: "image/Eau/vaguejunior.png" },
    { id: 'bullot', name: 'Bullot', type: 'eau', rarity:'common', attack: 10, defense: 10, hp: 20, image: "image/Eau/bullot.png" },
    { id: 'hydranon', name: 'Hydranon', type: 'eau', rarity:'common', attack: 15, defense: 5, hp: 20, image: "image/Eau/hydranon.png" },
    
    // Feu
    { id: 'embraseur', name: 'Embraseur', type: 'feu', rarity:'common', attack: 15, defense: 5, hp: 20, image: "image/Feu/embraseur.png" },
    { id: 'braizon', name: 'Braizon', type: 'feu', rarity:'common', attack: 13, defense: 7, hp: 20, image: "image/Feu/braizon.png" },
    { id: 'pyron', name: 'Pyron', type: 'feu', rarity:'common', attack: 16, defense: 4, hp: 20, image: "image/Feu/pyron.png" },
    { id: 'flambino', name: 'Flambino', type: 'feu', rarity:'common', attack: 14, defense: 6, hp: 20, image: "image/Feu/Flambino.png" },
    { id: 'cendrillon', name: 'Cendrillon', type: 'feu', rarity:'common', attack: 12, defense: 8, hp: 20, image: "image/Feu/cendrillon.png" },
    { id: 'incendium', name: 'Incendium', type: 'feu', rarity:'common', attack: 17, defense: 3, hp: 20, image: "image/Feu/incendium.png"},
    
    // Plante
    { id: 'florin', name: 'Florin', type: 'plante', rarity:'common', attack: 10, defense: 10, hp: 20, image: "image/Plante/Florin.png" },
    { id: 'racinelet', name: 'Racinelet', type: 'plante', rarity:'common', attack: 9, defense: 11, hp: 20, image: "image/Plante/racinelet.png" },
    { id: 'mousseur', name: 'Mousseur', type: 'plante', rarity:'common', attack: 11, defense: 9, hp: 20, image: "image/Plante/mousseur.png" },
    { id: 'fleurie', name: 'Fleurie', type: 'plante', rarity:'common', attack: 12, defense: 8, hp: 20, image: "image/Plante/Fleurie.png" },
    { id: 'champi', name: 'Champi', type: 'plante', rarity:'common', attack: 8, defense: 12, hp: 20, image: "image/Plante/champi.png" },
    { id: 'sylvanos', name: 'Sylvanos', type: 'plante', rarity:'common', attack: 10, defense: 10, hp: 20, image: "image/Plante/sylvanos.png"},
    
    // Terre
    { id: 'caillou', name: 'Caillou', type: 'terre', rarity:'common', attack: 10, defense: 12, hp: 20, image: "image/Terre/caillou.png" },
    { id: 'rochelle', name: 'Rochelle', type: 'terre', rarity:'common', attack: 9, defense: 13, hp: 20, image: "image/Terre/rochelle.png" },
    { id: 'mineralien', name: 'Minéralien', type: 'terre', rarity:'common', attack: 11, defense: 11, hp: 20, image: "image/Terre/minéralien.png" },
    { id: 'galette', name: 'Galette', type: 'terre', rarity:'common', attack: 12, defense: 10, hp: 20, image: "image/Terre/galette.png" },
    { id: 'pebble', name: 'Pebble', type: 'terre', rarity:'common', attack: 13, defense: 9, hp: 20, image: "image/Terre/pebble.png" },
    { id: 'geodon', name: 'Géodon', type: 'terre', rarity:'common', attack: 10, defense: 12, hp: 20, image: "image/Terre/géodon.png" }
  ],

  // ----------------------------------------------------------Rare-----------------------------------------------------------------------
  rare: [
    { id: 'ondin', name: 'Ondin', type: 'eau', rarity:'rare', attack: 16, defense: 12, hp: 22, image: "image/Eau/ondin.png" },
    { id: 'sirena', name: 'Siréna', type: 'eau', rarity:'rare', attack: 17, defense: 11, hp: 22, image: "image/Eau/sirena.png" },
    { id: 'marinelle', name: 'Marinelle', type: 'eau', rarity:'rare', attack: 18, defense: 10, hp: 22, image: "image/Eau/marinelle.png" },

    { id: 'salamandre', name: 'Salamandre', type: 'feu', rarity:'rare', attack: 17, defense: 12, hp: 22, image: "image/Feu/salamandre.png" },
    { id: 'feuret', name: 'Feuret', type: 'feu', rarity:'rare', attack: 18, defense: 10, hp: 22, image: "image/Feu/feuret.png" },
    { id: 'magmeling', name: 'Magmeling', type: 'feu', rarity:'rare', attack: 19, defense: 10, hp: 22, image: "image/Feu/magmeling.png" },

    { id: 'dryade', name: 'Dryade', type: 'plante', rarity:'rare', attack: 15, defense: 13, hp: 22, image: "image/Plante/dryade.png" },
    { id: 'squirel', name: 'Squirel', type: 'plante', rarity:'rare', attack: 14, defense: 14, hp: 22, image: "image/Plante/squirel.png" },
    { id: 'roncebarbe', name: 'Roncebarbe', type: 'plante', rarity:'rare', attack: 16, defense: 12, hp: 22, image: "image/Plante/roncebarbe.png" },

    { id: 'golem', name: 'Golem', type: 'terre', rarity:'rare', attack: 15, defense: 14, hp: 22, image: "image/Terre/golem.png" },
    { id: 'bouldard', name: 'Bouldard', type: 'terre', rarity:'rare', attack: 17, defense: 13, hp: 22, image: "image/Terre/bouldard.png" },
    { id: 'terramite', name: 'Terramite', type: 'terre', rarity:'rare', attack: 14, defense: 15, hp: 22, image: "image/Terre/terramite.png" }
  ],
  
  // -------------------------------------------------------------Épique (2-3 par type)------------------------------------------------------
  epic: [
    { id: 'kraken', name: 'Kraken', type: 'eau', rarity:'epic', attack: 20, defense: 18, hp: 25, image: "image/Eau/kraken.png" },
    { id: 'leviathan', name: 'Léviathan', type: 'eau', rarity:'epic', attack: 18, defense: 20, hp: 25, image: "image/Eau/leviathan.png" },

    { id: 'dragondelave', name: 'Dragon de Lave', type: 'feu', rarity:'epic', attack: 21, defense: 16, hp:25, image: "image/Feu/dragondelave.png" },
    { id: 'phenix', name: 'Phénix', type: 'feu', rarity:'epic', attack: 22, defense: 15, hp: 25, image: "image/Feu/phenix.png" },

    { id: 'dracofeuille', name: 'Dracofeuille', type: 'plante', rarity:'epic', attack: 20, defense: 20, hp: 25, image: "image/Plante/dracofeuille.png" },
    { id: 'entancien', name: 'Ent Ancien', type: 'plante', rarity:'epic', attack: 18, defense: 23, hp: 25, image: "image/Plante/entancien.png" },

    { id: 'titandepierre', name: 'Titan de Pierre', type: 'terre', rarity:'epic', attack: 23, defense: 19, hp: 25, image: "image/Terre/titandepierre.png" },
    { id: 'colosse', name: 'Colosse', type: 'terre', rarity:'epic', attack: 20, defense: 20, hp: 25, image: "image/Terre/colosse.png" }
  ]
};

// -----------------------------------------------------------------Boss-----------------------------------------------------------------------
const BOSS_SPECIES = [
  { name: 'Dracozor', type: 'feu', rarity: 'epic',  hp: 25, attack: 28, defense: 26, speed: 10 , image: 'image/boss/dracozor.png' },
  { name: 'Hydranox', type: 'eau', rarity: 'epic',  hp: 25, attack: 26, defense: 28, speed: 10 , image: 'image/boss/hydranox.png' },
  { name: 'Gravelor', type: 'terre', rarity: 'epic',  hp: 25, attack: 27, defense: 27, speed: 10 , image: 'image/boss/gravelor.png' },
  { name: 'Broceliox', type: 'plante', rarity: 'epic',  hp: 25, attack: 26, defense: 28, speed: 10 , image: 'image/boss/broceliox.png'},
];

// ----------------------------------------------Database Evolution et principe d'évolution--------------------------------------------------------------------
const EVOLVED_SPECIES = {
    'hydrolette': { id: 'hydrolette', name: 'Hydrolette', type: 'eau', rarity: 'common', attack: 15, defense: 10, speed: 8, hp: 25, image: "image/Eau/hydrolette.png" },
    'pyronis': { id: 'pyronis', name: 'Pyronis', type: 'feu', rarity: 'common', attack: 20, defense: 8, speed: 8, hp: 25, image: "image/Feu/pyronis.png" },
    'mycolos': { id: 'mycolos', name: 'Mycolos', type: 'plante', rarity: 'common', attack: 14, defense: 17, speed: 8, hp: 25, image: "image/Plante/mycolos.png" },
    'terrelet': { id: 'terrelet', name: 'Terrelet', type: 'terre', rarity: 'common', attack: 15, defense: 15, speed: 8, hp: 25, image: "image/Terre/terrelet.png" },
    'volcalave': { id: 'volcalave', name: 'Volcalave', type: 'feu', rarity: 'epic', attack: 27, defense: 21, speed: 8, hp: 33, image: "image/Feu/volcalave.png" },
    'fulminoir': { id: 'fulminoir', name: 'Fulminoir', type: 'feu', rarity: 'rare', attack: 23, defense: 15, speed: 8, hp: 27, image: "image/Feu/fulminoir.png" },
    'sirenalia': { id: 'sirenalia', name: 'Sirenalia', type: 'eau', rarity: 'rare', attack: 22, defense: 15, speed: 8, hp: 27, image: "image/Eau/sirenalia.png" },
    'vaguesenior': { id: 'vaguesenior', name: 'Vague Sénior', type: 'eau', rarity: 'common', attack: 17, defense: 12, speed: 8, hp: 25, image: "image/Eau/vaguesenior.png" },
    'vegetoss': { id: 'vegetoss', name: 'Vegetoss', type: 'plante', rarity: 'common', attack: 16, defense: 14, speed: 8, hp: 25, image: "image/Plante/vegetoss.png" },
    'squirfeuil': { id: 'squirfeuil', name: 'Squirfeuil', type: 'plante', rarity: 'rare', attack: 19, defense: 19, speed: 8, hp: 27, image: "image/Plante/squirfeuil.png" },
};

const EVOLUTIONS = {
    'gouttelette': {evolvesTo: 'hydrolette', condition: {level: 20, victories: 3000}},
    'pyron': {evolvesTo: 'pyronis', condition: {level: 20, victories: 3000}},
    'champi': {evolvesTo: 'mycolos', condition: {level: 20, victories: 3000}},
    'mineralien': {evolvesTo: 'terrelet', condition: {level: 25, victories: 4000}},
    'dragondelave': {evolvesTo: 'volcalave', condition: {level: 70, victories: 33000}},
    'feuret': {evolvesTo: 'fulminoir', condition: {level: 35, victories: 13000}},
    'sirena': {evolvesTo: 'sirenalia', condition: {level: 35, victories: 13000}},
    'vaguejunior': {evolvesTo: 'vaguesenior', condition: {level: 20, victories: 3000}},
    'mousseur': {evolvesTo: 'vegetoss', condition: {level: 20, victories: 3000}},
    'squirel': {evolvesTo: 'squirfeuil', condition: {level: 35, victories: 13000}},
};

// -----------------------------------------------------------ITEMS DANS LA BOUTIQUE-------------------------------------------------------------
const ITEMS = [
  { id: '1', name: 'Épée de Bois', type: 'attack', rarity: 'common', price: 100, bonus: 2, image: 'image/items/epéedebois.png', description: '+2 ATQ',  },
  { id: '7', name: 'Épée de Fer', type: 'attack', rarity: 'rare', price: 500, bonus: 4, image: 'image/items/epéedefer.png', description: '+4 ATQ',  },
  { id: '8', name: 'Épée de Diamant', type: 'attack', rarity: 'epic', price: 1500, bonus: 8, image: 'image/items/epéedediamant.png', description: '+8 ATQ',  },
  { id: '2', name: 'Bouclier en Bois', type: 'defense', rarity: 'common', price: 100, bonus: 2, image: 'image/items/bouclierdebois.png', description: '+2 DEF',  },
  { id: '9', name: 'Armure en fer', type: 'defense', rarity: 'rare', price: 500, bonus: 4, image: 'image/items/armureenfer.png', description: '+4 DEF',  },
  { id: '10', name: 'Talisman défensif', type: 'defense', rarity: 'epic', price: 1500, bonus: 8, image: 'image/items/talismandef.png', description: '+8 DEF',  },
  { id: '3', name: 'Poudre de vitesse commun', type: 'speed', rarity: 'rare', price: 300, bonus: 1, image: 'image/items/poudrevitesse1.png', description: '+1 VIT',  },
  { id: '4', name: 'Potion de Vie', type: 'hp', rarity: 'common', price: 100, bonus: 5, image: 'image/items/potionvie1.png', description: '+5 PV' , },
  { id: '5', name: 'Potion de Vie', type: 'hp', rarity: 'rare', price: 500, bonus: 10, image: 'image/items/potionvie2.png', description: '+10 PV',  },
  { id: '6', name: 'Potion de Vie', type: 'hp', rarity: 'epic', price: 1500, bonus: 20, image: 'image/items/potionvie3.png', description: '+20 PV', },
  {id: 'xp_boost_200',name: 'Jeton d\'XP (200)',price: 1000, description: 'Ajoute 200 points d\'expérience au monstre actif.',type: 'xp', bonus: 200, image: 'image/items/xp200.png',sellValue: 0,rarity: 'common',},
  {id: 'xp_boost_500',name: 'Jeton d\'XP (500)',price: 2300, description: 'Ajoute 500 points d\'expérience au monstre actif.',type: 'xp', bonus: 500, image: 'image/items/xp500.png',sellValue: 0,rarity: 'rare',},
  {id: 'energyboost10',name: 'Jeton d\'Energie (10)',price: 480, description: 'Ajoute 10 points d\'énergie.',type: 'energy', bonus: 10, image: 'image/items/energy10.png',sellValue: 0,rarity: 'commun',},
  {id: 'ticketroulette',name: 'Ticket de Roulette',price: 500, description: 'Permet de faire tourner la roue une fois de plus.',type: 'consumable', effect: 'slots_spin', image: 'image/items/ticketroulette.png',sellValue: 100,rarity: 'rare',},
];

// ---------------------------------------------------------ITEMS DE VICTOIRE DE BOSS-------------------------------------------------------------------
const BOSS_LOOT_TABLE = [
    {id: 'ancient_amulet', name: 'Amulette Ancienne', type: 'speed', statModifiers: { speed: { min: 0.15, max: 0.30 } }, price: 5000, rarity: 'legendary', image: 'image/items/amuletteancienne.png', description: '',},
    {id: 'legendary_sword',name: 'Épée Légendaire',type: 'attack',statModifiers: { attack: { min: 0.10, max: 0.20 } },price: 5000,rarity: 'legendary',image: 'image/items/épéelégendaire.png', description: '', },
    {id: 'bouclierlegendaire',name: 'Bouclier Légendaire',type: 'defense',statModifiers: { defense: { min: 0.10, max: 0.20 } },price: 5000,rarity: 'legendary',image: 'image/items/bouclierlegendaire.png', description: '', },
    {id: 'coeureternite',name: 'Coeur éternité',type: 'hp',statModifiers: { hp: { min: 0.10, max: 0.20 } },price: 5000,rarity: 'legendary',image: 'image/items/coeureternite.png', description: '', },
];

//-------------------------------------------- Définition des objectifs quotidiens possibles--------------------------------------------------------
const DAILY_OBJECTIVES = [
    {
        id: 'win_battles',
        name: 'Gagner des combats',
        description: 'Remportez {value} combats dans la tour.',
        reward: 50,
        type: 'battles',
        value: 5,
        current: 0
    },
    {
        id: 'reach_floor',
        name: 'Atteindre un étage',
        description: 'Atteignez l\'étage {value} ou plus.',
        reward: 75,
        type: 'floor',
        value: 10,
        current: 0
    },
    {
        id: 'gain_xp',
        name: 'Gagner de l\'XP',
        description: 'Gagnez un total de {value} XP.',
        reward: 40,
        type: 'xp',
        value: 500,
        current: 0
    },
    {
        id: 'capture_monster',
        name: 'Capturer un monstre',
        description: 'Achetez un œuf mystère et capturez un nouveau monstre.',
        reward: 100,
        type: 'capture',
        value: 1,
        current: 0
    }
];

// ----------------------------- Constantes pour les améliorations de la Boutique------------------------------------------------------------
const SHOP_UPGRADES = {
  attack: {
    name: "Amélioration d'Attaque",
  },
  defense: {
    name: "Amélioration de Défense",
  },
  speed: {
    name: "Amélioration de Vitesse",
  },
};

// ---- État du jeu
let state = {
  gold: 0,
  energy: ENERGY_MAX,
  currentFloor: 1,
  playerMonsters: [],
  activeMonsterId: null,
  energyTimer: null,
  battle: {
    running: false,
    speedIndex: 0, // x1 par défaut
    atb: { player: 0, enemy: 0 },
    intervalId: null
  },
  playerItems: [],
  dailyObjectives: [],
  lastObjectiveReset: null,
  lastObjectiveReset: null, // Horodatage de la dernière réinitialisation
  lastRouletteSpin: null,
};

// ------------------------------------------------------------------- Helpers----------------------------------------------------------------

function rand(min,max){ return Math.floor(Math.random()*(max-min+1))+min; }
function choice(arr){ return arr[rand(0,arr.length-1)]; }
function clamp(v,min,max){ return Math.max(min, Math.min(max, v)); }
function xpNeeded(level) {
    return Math.floor(100 * (level ** 1.5));
}

// ------------------------------------------------------------------ UI helpers--------------------------------------------------------
function showScreen(id) {
    document.querySelectorAll('.screen').forEach(s => s.classList.add('hidden'));

    let targetId;
    if (id === 'evolution') {
        targetId = 'evolution-screen';
    } else if (id === 'slots') {
        targetId = 'slots-screen';
        initSlotsScreen();
    } else if (id === 'monstrodex') {  // AJOUT DE CETTE CONDITION
        targetId = 'monstrodex-screen';
    } else {
        targetId = id + '-screen';
    }

    const targetScreen = document.getElementById(targetId);

    if (targetScreen) {
        targetScreen.classList.remove('hidden');
    } else {
        console.error(`Erreur: L'écran avec l'ID '${targetId}' n'a pas été trouvé.`);
    }
    
    if(id === 'main') renderMain();
    if(id === 'collection') renderCollection();
    if(id === 'shop') renderShop();
    if(id === 'inventory') renderInventory();
    if (id === 'objectives') {
        renderObjectives();
    }
    if (id === 'monstrodex') {  // AJOUT DE CETTE CONDITION
        renderMonstrodex();
    }
}

// -------------------------------------------------Pop up de message--------------------------------------------------------------------------

function showModal(title, text, confirmCallback = null) {
  const modal = document.getElementById("modal");
  const modalContent = document.getElementById("modal-content");
  
  let modalHtml = `<h3>${title}</h3><p>${text}</p>`;

  if (confirmCallback) {
    modalHtml += `<div class="modal-buttons"><button class="btn" onclick="confirmModal()">Confirmer</button><button class="btn btn-mini" onclick="closeModal()">Annuler</button></div>`;
    window.confirmModal = confirmCallback;
  } else {
    modalHtml += `<button class="btn" onclick="closeModal()">Fermer</button>`;
  }
  
  modalContent.innerHTML = modalHtml;
  modal.classList.remove("hidden");
}

function closeModal() {
  const modal = document.getElementById("modal");
  modal.classList.add("hidden");
  window.confirmModal = null;
}

function showHelpModal() {
    const helpContent = `
        <h3>⁉️ Aide et Fonctionnalités du jeu ⁉️</h3>
        <h4>🎮 Le but du jeu 🎮</h4>
        <p>Élevez et entraînez vos monstres pour qu'ils deviennent les plus puissants. Affrontez des ennemis pour gagner de l'or, de l'expérience et des objets rares.</p>
        <p> <strong>Objectif:</strong> Atteindre les sommets </p>
        <h4>⚡ L'Énergie ⚡</h4>
        <p>Chaque combat consomme 1 point d'énergie. L'énergie se régénère automatiquement avec le temps, même quand le jeu est fermé !</p>
        
        <h4>🎰 La Roulette Quotidienne 🎰</h4>
        <p>Tentez votre chance une fois par jour pour gagner des récompenses spéciales. Vous pouvez aussi acheter des tickets pour plus de tours dans la boutique.</p>
        
        <h4>📦 L'Inventaire 📦</h4>
        <p>Gardez un œil sur vos monstres et les objets que vous collectez. Équipez vos monstres avec des objets pour augmenter leurs statistiques.</p>
        
        <h4> 🧺La Boutique 🧺</h4>
        <p>Achetez des objets utiles à votre progression en utilisant l'or que vous gagnez au combat.</p>
    `;
    
    // Affiche la modale avec le contenu d'aide
    showModal('Comment jouer ?', `<div class="scrollable-content">${helpContent}</div>`);
}

function getSpecies(monsterName) {
  for (const rarity in SPECIES) {
    const found = SPECIES[rarity].find(species => species.name === monsterName);
    if (found) {
      return found;
    }
  }
  return null;
}

// ================================================================================================
// SYSTÈME UNIFIÉ DE GESTION DES STATS
// ================================================================================================

/**
 * Fonction centrale pour calculer les statistiques finales d'un monstre
 * Prend en compte : stats de base + bonus permanents + bonus d'objets équipés
 */
function getFinalStats(monster) {
    if (!monster) return { hp: 0, attack: 0, defense: 0, speed: 0 };
    
    // Stats de base + bonus permanents (montée de niveau, améliorations boutique)
    const baseStats = {
        hp: monster.baseStats.hp + monster.statBonus.hp,
        attack: monster.baseStats.attack + monster.statBonus.attack,
        defense: monster.baseStats.defense + monster.statBonus.defense,
        speed: monster.baseStats.speed + monster.statBonus.speed
    };
    
    // Ajout des bonus d'objets équipés
    const finalStats = { ...baseStats };
    
    if (monster.equippedItems) {
        Object.values(monster.equippedItems).forEach(item => {
            if (item.bonus) {
                // Pour les objets avec bonus fixe
                if (finalStats[item.type] !== undefined) {
                    finalStats[item.type] += item.bonus;
                }
            }
            
            if (item.stats) {
                // Pour les objets légendaires avec bonus en pourcentage
                Object.keys(item.stats).forEach(stat => {
                    if (finalStats[stat] !== undefined) {
                        const percentBonus = item.stats[stat];
                        finalStats[stat] = Math.floor(finalStats[stat] * (1 + percentBonus));
                    }
                });
            }
        });
    }
    
    return finalStats;
}

/**
 * Fonction pour s'assurer que les HP d'un monstre restent dans les limites valides
 */
function validateMonsterHP(monster) {
    const finalStats = getFinalStats(monster);
    monster.hp = Math.max(0, Math.min(monster.hp, finalStats.hp));
}

// -------------------------------- Création d'un monstre depuis une espèce fixe avec variabilité----------------------------------------------

function createMonsterFromSpecies(species) {
    const spdBase = species.rarity === 'epic' ? 8 : species.rarity === 'rare' ? 6 : 5;

    // Variabilité des stats : ±20% des valeurs de base
    const variance = 0.2;
    const randomStat = (baseStat) => {
        const min = Math.floor(baseStat * (1 - variance));
        const max = Math.floor(baseStat * (1 + variance));
        return Math.max(1, rand(min, max));
    };

    const randomHp = (baseHp) => {
        const min = Math.floor(baseHp * (1 - variance));
        const max = Math.floor(baseHp * (1 + variance));
        return Math.max(10, rand(min, max));
    };

    const baseAttack = randomStat(species.attack);
    const baseDefense = randomStat(species.defense);
    const baseSpeed = Math.max(3, randomStat(spdBase));
    const baseHp = randomHp(species.hp);

    const monster = {
        id: createId(),
        speciesId: species.id,
        name: species.name,
        image: species.image,
        type: species.type,
        rarity: species.rarity,
        level: 1,
        xp: 0,
        xpNeeded: 100,
        hp: baseHp,
        // Stats de base du monstre (valeurs randomisées à la création)
        baseStats: {
            hp: baseHp,
            attack: baseAttack,
            defense: baseDefense,
            speed: baseSpeed
        },
        // Améliorations de stats qui seront gardées (montées de niveau, boutique)
        statBonus: {
            attack: 0,
            defense: 0,
            speed: 0,
            hp: 0
        },
        victories: 0,
        equippedItems: {}
    };

    return monster;
}

// ---- Accès & rendu de chaque écran------------------------------------------------------------------

function getActiveMonster(){ return state.playerMonsters.find(m=>m.id===state.activeMonsterId); }

function renderMain(){
    document.getElementById('gold').textContent = state.gold;
    document.getElementById('energy').textContent = state.energy;
    document.getElementById('energy-max').textContent = ENERGY_MAX;
    document.getElementById('floor').textContent = state.currentFloor;
    
    const container = document.getElementById('active-monster');
    const m = getActiveMonster();
    
    if(!m){
        container.innerHTML = `<div class="card"><p>Aucun monstre actif. Achetez un œuf dans la boutique !</p></div>`;
        return;
    }
    
    // Utilisation de la fonction unifiée pour obtenir les stats finales
    const finalStats = getFinalStats(m);
    
    // Validation des HP
    validateMonsterHP(m);
    
    const hpPct = clamp((m.hp/finalStats.hp)*100,0,100);
    const xpPct = clamp((m.xp/m.xpNeeded)*100,0,100);

    // Génération de l'HTML pour les objets équipés
    const equippedItemsHtml = Object.values(m.equippedItems).map(item => `
        <div class="equipped-item rarety-${item.rarity}">
            <img src="${item.image}" alt="${item.name}" class="item-icon">
        </div>
    `).join('');

    // Ajout du compteur de victoires
    let victoriesHtml = `<div class="statline">Victoires : ${m.victories}</div>`;
    const evolutionInfo = EVOLUTIONS[m.species];
    if (evolutionInfo) {
        const victoriesNeeded = evolutionInfo.condition.victories;
        victoriesHtml = `<div class="statline">Victoires : ${m.victories}/${victoriesNeeded}</div>`;
        if (m.evolutionPending) {
            victoriesHtml += `<div class="statline evolution-ready">Prêt à évoluer en ${EVOLVED_SPECIES[evolutionInfo.evolvesTo].name} !</div>`;
        }
    }

    container.innerHTML = `
      <div class="card">
        <img class="monster-img" src="${m.image}" alt="${m.name}">
        <h3>${m.name} <span class="badge ${m.rarity}">${m.rarity.toUpperCase()}</span></h3>
        <div class="equipped-items-container">
            ${equippedItemsHtml}
            ${Object.keys(m.equippedItems).length > 0 ? `<button class="btn btn-unequip-all" onclick="unequipAllItems()">Déséquiper tout</button>` : ''}
        </div>
        <div class="statline">Type : ${m.type} — Niveau ${m.level}</div>
        <div class="bar hpbar"><div class="hpfill" style="width:${hpPct}%"></div></div>
        <div class="bar xpbar"><div class="xpfill" style="width:${xpPct}%"></div></div>
        <div class="row">
          <div class="statline">ATQ ${finalStats.attack}</div>
          <div class="statline">DEF ${finalStats.defense}</div>
          <div class="statline">VIT ${finalStats.speed}</div>
          <div class="statline">PV ${m.hp}/${finalStats.hp}</div>
        </div>
        ${victoriesHtml}
      </div>
    `;
}

function renderCollection() {
    const list = document.getElementById('monster-list');
    list.innerHTML = '';
    
    state.playerMonsters.forEach(m => {
        const finalStats = getFinalStats(m);
        const hpPct = clamp((m.hp / finalStats.hp) * 100, 0, 100);
        const xpPct = clamp((m.xp / m.xpNeeded) * 100, 0, 100);
        
        const div = document.createElement('div');
        div.className = 'card';

        const isActive = m.id === state.activeMonsterId;
        const sellBtnText = isActive ? 'Actif' : `Vendre (${getMonsterSellPrice(m)} or)`;
        const sellBtnDisabled = isActive ? 'disabled' : '';

        let maxFloorHTML = '';
        if (m.maxFloor !== undefined) {
            maxFloorHTML = `<div class="statline">Étage max : ${m.maxFloor}</div>`;
        }

        // Ajout du compteur de victoires
        let victoriesHtml = `<div class="statline">Victoires : ${m.victories}</div>`;
        const evolutionInfo = EVOLUTIONS[m.species];
        if (evolutionInfo) {
            const victoriesNeeded = evolutionInfo.condition.victories;
            victoriesHtml = `<div class="statline">Victoires : ${m.victories}/${victoriesNeeded}</div>`;
            if (m.evolutionPending) {
                victoriesHtml += `<div class="statline evolution-ready">Prêt à évoluer en ${EVOLVED_SPECIES[evolutionInfo.evolvesTo].name} !</div>`;
            }
        }

        div.innerHTML = `
            <img class="monster-img" src="${m.image}" alt="${m.name}">
            <h3>${m.name} <span class="badge ${m.rarity}">${m.rarity.toUpperCase()}</span></h3>
            <div class="statline">Type : ${m.type} — Niveau ${m.level}</div>
            <div class="bar hpbar"><div class="hpfill" style="width:${hpPct}%"></div></div>
            <div class="bar xpbar"><div class="xpfill" style="width:${xpPct}%"></div></div>
            <div class="statline">ATQ ${finalStats.attack} • DEF ${finalStats.defense} • VIT ${finalStats.speed} • PV ${m.hp}/${finalStats.hp}</div>
            ${maxFloorHTML}
            ${victoriesHtml}
            <div class="row">
                <button class="btn" onclick="setActiveMonster('${m.id}')">Activer</button>
                <button class="btn btn-mini" ${sellBtnDisabled} onclick="sellMonster('${m.id}')">${sellBtnText}</button>
            </div>
        `;
        list.appendChild(div);
    });
}

// Nouvelle fonction utilitaire pour l'affichage du prix
function getMonsterSellPrice(monster) {
    const basePrice = getMonsterBasePrice(monster);
    return Math.floor(basePrice * MONSTER_SELL_RATE);
}

// ---------Ecran du Monstrodex---------------------//

function renderMonstrodex() {
    const container = document.getElementById('monstrodex-list');
    container.innerHTML = '';
    
    // Combine toutes les espèces de base
    const baseSpecies = Object.values(SPECIES).flat();
    
    // Créer une map des évolutions par espèce de base
    const evolutionMap = {};
    Object.keys(EVOLUTIONS).forEach(baseSpeciesId => {
        const evolutionData = EVOLUTIONS[baseSpeciesId];
        evolutionMap[baseSpeciesId] = EVOLVED_SPECIES[evolutionData.evolvesTo];
    });
    
    // Trier les espèces de base par rareté puis par nom
    const rarityOrder = { common: 1, rare: 2, epic: 3 };
    baseSpecies.sort((a, b) => {
        if (rarityOrder[a.rarity] !== rarityOrder[b.rarity]) {
            return rarityOrder[a.rarity] - rarityOrder[b.rarity];
        }
        return a.name.localeCompare(b.name);
    });
    
    // Créer les cartes
    baseSpecies.forEach(species => {
        // Créer la carte pour l'espèce de base
        createMonsterCard(species, false, container);
        
        // Si cette espèce a une évolution, créer sa carte juste après
        const evolution = evolutionMap[species.id];
        if (evolution) {
            createMonsterCard(evolution, true, container);
        }
    });
    
    // Ajouter les évolutions qui n'ont pas de forme de base dans EVOLUTIONS
    Object.values(EVOLVED_SPECIES).forEach(species => {
        // Vérifier si cette évolution n'a pas déjà été ajoutée
        const hasBaseForm = Object.values(EVOLUTIONS).some(evo => evo.evolvesTo === species.id);
        if (!hasBaseForm) {
            createMonsterCard(species, true, container);
        }
    });
}

function createMonsterCard(species, isEvolution, container) {
    const hasMonster = state.playerMonsters.some(m => m.speciesId === species.id);
    const card = document.createElement('div');
    card.classList.add('monstrodex-card');
    
    if (isEvolution) {
        card.classList.add('evolution-card');
    }
    
    if (hasMonster) {
        card.classList.add('owned');
        card.onclick = () => showMonsterStatsModal(species);
        card.style.cursor = 'pointer';
    } else {
        card.classList.add('unowned');
    }
    
    // Image avec effet de noircissement pour les monstres non possédés
    const imageElement = hasMonster ? 
        `<img src="${species.image}" alt="${species.name}">` :
        `<img src="${species.image}" alt="???" class="unknown-monster">`;
    
    // Indicateur d'évolution
    const evolutionBadge = isEvolution ? '<span class="evolution-badge">⭐ Évolution</span>' : '';
    
    card.innerHTML = `
        ${imageElement}
        ${evolutionBadge}
        <h3>${hasMonster ? species.name : '???'}</h3>
        <p>Type: ${hasMonster ? species.type : '???'}</p>
        <p>Rareté: <span class="rarity ${hasMonster ? species.rarity : ''}">${hasMonster ? species.rarity : '???'}</span></p>
    `;
    
    container.appendChild(card);
}


function showMonsterStatsModal(species) {
    // Vérifier les informations d'évolution
    let evolutionInfo = '';
    const evolutionData = EVOLUTIONS[species.id];
    
    if (evolutionData) {
        const evolvedSpecies = EVOLVED_SPECIES[evolutionData.evolvesTo];
        if (evolvedSpecies) {
            evolutionInfo = `
                <hr style="margin: 20px 0; border: 1px solid #ddd;">
                <h4 style="color: #e74c3c; margin-bottom: 10px;">Évolution disponible :</h4>
                <p><strong>Évolue en :</strong> ${evolvedSpecies.name}</p>
                <p><strong>Conditions :</strong></p>
                <ul style="margin-left: 20px;">
                    ${evolutionData.condition.level ? `<li>Niveau ${evolutionData.condition.level}</li>` : ''}
                    ${evolutionData.condition.victories ? `<li>${evolutionData.condition.victories} victoires</li>` : ''}
                </ul>
            `;
        }
    }
    
    const statsContent = `
        <div style="text-align: center;">
            <h3>${species.name}</h3>
            <img src="${species.image}" alt="${species.name}" style="width: 150px; height: 150px; margin-bottom: 20px;">
            <div style="text-align: left;">
                <p><strong>Type:</strong> ${species.type}</p>
                <p><strong>Rareté:</strong> <span class="rarity ${species.rarity}">${species.rarity}</span></p>
                <p><strong>Attaque de base:</strong> ${species.attack}</p>
                <p><strong>Défense de base:</strong> ${species.defense}</p>
                <p><strong>PV de base:</strong> ${species.hp}</p>
                ${evolutionInfo}
            </div>
        </div>
    `;
    
    showModal(species.name, statsContent);
}

// ===========================================================================================================================================
// ---- Boutique
// ===========================================================================================================================================

// Fonction pour les améliorations
function buyUpgrade(stat) {
    const m = getActiveMonster();
    if (!m) return showModal('Aucun monstre', 'Veuillez activer un monstre.');
    
    // Calcule la stat actuelle (stats de base + bonus permanents) pour le calcul du coût
    const currentStatValue = m.baseStats[stat] + m.statBonus[stat];
    const cost = 100 * (currentStatValue + 1);
    
    if (state.gold < cost) {
        return showModal('Pas assez d\'or', `Il vous faut ${cost} or pour acheter cette amélioration.`);
    }

    state.gold -= cost;
    m.statBonus[stat] += 1;
    
    // Validation des HP après amélioration
    validateMonsterHP(m);
    
    showModal('Amélioration', `Votre monstre a gagné +1 en ${stat} !`);
    saveState(1);
    renderMain();
    renderShop();
}

function renderUpgradeShop() {
    const upgradesContainer = document.getElementById('upgrades-container');
    upgradesContainer.innerHTML = '';
    const activeMonster = getActiveMonster();
    
    if (!activeMonster) {
        upgradesContainer.innerHTML = '<p>Veuillez d\'abord sélectionner un monstre pour voir les améliorations.</p>';
        return;
    }

    for (const stat in SHOP_UPGRADES) {
        const upgrade = SHOP_UPGRADES[stat];
        const currentStatValue = activeMonster.baseStats[stat] + activeMonster.statBonus[stat];
        const cost = 100 * (currentStatValue + 1);

        const cardHtml = `
            <div class="shop-card">
                <img src="image/${stat}.png" alt="${upgrade.name}">
                <h4>${upgrade.name}</h4>
                <p>Coût: ${cost} Or</p>
                <button class="btn" onclick="buyUpgrade('${stat}')">Acheter</button>
            </div>
        `;
        upgradesContainer.innerHTML += cardHtml;
    }
}

// DÉFINITION DU PRIX DE BASE DE OEUF
function getEggCost() {
    return 50 + state.playerMonsters.length * 50;
}

function buyEgg() {
    const eggCost = getEggCost();

    showModal(
        'Confirmation d\'achat',
        `Voulez-vous acheter un œuf mystère pour ${eggCost} or ?`,
        () => {
            if (state.gold < eggCost) {
                showModal('Pas assez d\'or', `Il vous faut au moins ${eggCost} or pour acheter cet œuf mystère.`);
                return;
            }

            state.gold -= eggCost;

            // Tirage aléatoire pour déterminer la rareté
            const roll = Math.random();
            let selectedRarity = '';
            if (roll < EGG_PROBABILITIES.epic) {
                selectedRarity = 'epic';
            } else if (roll < EGG_PROBABILITIES.epic + EGG_PROBABILITIES.rare) {
                selectedRarity = 'rare';
            } else {
                selectedRarity = 'common';
            }

            // Choisir un monstre aléatoire de la rareté sélectionnée
            const randomSpecies = choice(SPECIES[selectedRarity]);
            const newMonster = createMonsterFromSpecies(randomSpecies);

            // Ajouter le nouveau monstre
            state.playerMonsters.push(newMonster);
            state.dailyObjectives.forEach(obj => {
                if (obj.type === 'capture') {
                    obj.current += 1;
                }
            });
            saveState(1);

            showModal('Félicitations !', `Vous avez fait éclore un ${newMonster.rarity} ${newMonster.name} !`);
            renderCollection();
            renderMain();
            renderShop();
        }
    );
}

function renderShop(){
    const eggCost = getEggCost();
    document.getElementById('egg-cost-text').textContent = `${eggCost} or`;
    renderUpgradeShop();
    renderItemShop(); 
}

// ACHAT DES OBJETS et gestion des objets
function buyItem(itemId) {
    const itemToBuy = ITEMS.find(item => item.id === itemId);
    if (!itemToBuy) {
        console.error('Erreur: objet non trouvé');
        return;
    }
    
    showModal(
        'Confirmation d\'achat',
        `Voulez-vous acheter "${itemToBuy.name}" pour ${itemToBuy.price} or ?`,
        () => {
            if (state.gold < itemToBuy.price) {
                showModal('Pas assez d\'or', `Il vous faut au moins ${itemToBuy.price} or pour acheter cet objet.`);
                return;
            }

            state.gold -= itemToBuy.price;
            
            // CORRECTION : Ajouter un uniqueId à l'objet acheté
            const purchasedItem = { 
                ...itemToBuy, 
                uniqueId: 'item_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9)
            };
            
            state.playerItems.push(purchasedItem);
            saveState(1);

            renderMain();
            showModal('Achat réussi !', `Vous avez acheté ${itemToBuy.name}. Il a été ajouté à votre inventaire !`);
        }
    );
}

function renderItemShop() {
    const itemList = document.getElementById('item-list');
    itemList.innerHTML = '';
    
    ITEMS.forEach(item => {
        const itemHtml = `
            <div class="item-card">
                <img src="${item.image}" alt="${item.name}" class="item-image">
                <p>${item.name}</p>
                <p>${item.description}</p>
                <button class="btn" onclick="buyItem('${item.id}')">Acheter (${item.price} or)</button>
            </div>
        `;
        itemList.innerHTML += itemHtml;
    });
}

function renderInventory() {
    const inventoryGrid = document.getElementById('inventory-grid');
    inventoryGrid.innerHTML = '';
    
    if (state.playerItems.length === 0) {
        inventoryGrid.innerHTML = '<p>Votre inventaire est vide.</p>';
        return;
    }
    
    state.playerItems.forEach((item, index) => {
        const activeMonster = getActiveMonster();
        const isEquipped = activeMonster && Object.values(activeMonster.equippedItems).some(equippedItem => 
            equippedItem.uniqueId === item.uniqueId
        );
        
        const sellPrice = Math.floor((item.price || 0) * 0.25);
        
        const itemCard = document.createElement('div');
        itemCard.className = `card item-card rarety-${item.rarity}`;
        
        itemCard.innerHTML = `
            <h3>${item.name}</h3>
            <p>${item.description}</p>
            <img src="${item.image}" alt="${item.name}" class="item-image">
            <p>Valeur: ${sellPrice} or</p>
        `;
        
        // Différenciation des boutons selon le type d'objet
       // --- Cas spécial : ticket de roulette ---
        if (item.id === 'ticketroulette') {
            itemCard.innerHTML += `
                <div class="item-actions">
                    <button class="btn btn-sell" onclick="sellItem(${index})">Vendre</button>
                </div>
            `;
        }
        // --- Objets consommables classiques (xp, énergie) ---
        else if (['xp', 'energy'].includes(item.type)) {
            itemCard.innerHTML += `
                <div class="item-actions">
                    <button class="btn btn-use" onclick="useItem('${item.uniqueId}')">Utiliser</button>
                    <button class="btn btn-sell" onclick="sellItem(${index})">Vendre</button>
                </div>
            `;
        }
        // --- Objets équipables ---
        else {
            if (isEquipped) {
                itemCard.innerHTML += `
                    <button class="btn btn-unequip" onclick="unequipItem('${item.type}')">Déséquiper</button>
                `;
            } else {
                itemCard.innerHTML += `
                    <div class="item-actions">
                        <button class="btn btn-equip" onclick="equipItem('${item.uniqueId}')">Équiper</button>
                        <button class="btn btn-sell" onclick="sellItem(${index})">Vendre</button>
                    </div>
                `;
            }
        }
        
        inventoryGrid.appendChild(itemCard);
    });
}

function sellItem(index) {
    const item = state.playerItems[index];

    if (item) {
        const sellPrice = Math.floor(item.price * 0.25); 
        state.gold += sellPrice;
        state.playerItems.splice(index, 1);
        
        renderInventory();
        renderMain();
        
        showModal('Objet vendu !', `Vous avez vendu ${item.name} pour ${sellPrice} or.`);
        saveState(1);
    }
}

function equipItem(uniqueId) {
    const itemIndex = state.playerItems.findIndex(item => item.uniqueId === uniqueId);
    if (itemIndex === -1) {
        showModal('Erreur', 'Cet objet n\'est pas dans votre inventaire.');
        return;
    }
    
    const itemToEquip = state.playerItems[itemIndex];
    const activeMonster = getActiveMonster();
    if (!activeMonster) {
        showModal('Erreur', 'Aucun monstre actif pour équiper cet objet.');
        return;
    }
    
    // Vérifie si c'est un objet équipable
    if (['xp', 'energy'].includes(itemToEquip.type)) {
        showModal('Erreur', 'Cet objet ne peut pas être équipé. Utilisez le bouton "Utiliser".');
        return;
    }
    
    // Déséquipe l'objet existant du même type s'il y en a un
    const existingItem = activeMonster.equippedItems[itemToEquip.type];
    if (existingItem) {
        state.playerItems.push(existingItem);
    }
    
    // Équipe le nouvel objet
    activeMonster.equippedItems[itemToEquip.type] = itemToEquip;
    state.playerItems.splice(itemIndex, 1);
    
    // Validation des HP après équipement
    validateMonsterHP(activeMonster);
    
    saveState(1);
    renderMain();
    renderInventory();
    showModal('Objet équipé !', `Vous avez équipé "${itemToEquip.name}" sur votre monstre.`);
}

function unequipAllItems() {
    const activeMonster = getActiveMonster();
    if (!activeMonster || Object.keys(activeMonster.equippedItems).length === 0) {
        showModal('Impossible', 'Votre monstre n\'a pas d\'objets équipés.');
        return;
    }
    
    Object.values(activeMonster.equippedItems).forEach(item => {
        state.playerItems.push(item);
    });
    activeMonster.equippedItems = {};
    
    // Validation des HP après déséquipement
    validateMonsterHP(activeMonster);

    saveState(1);
    renderMain();
    renderInventory();
    showModal('Déséquipement réussi !', 'Tous les objets ont été déséquipés et remis dans votre inventaire.');
}

function generateRandomBonus(min, max) {
    return Math.random() * (max - min) + min;
}

function createItemInstance(itemData) {
    const newItem = {
        ...itemData,
        uniqueId: 'item_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9),  // Changé de 'id' à 'uniqueId'
        description: "",
        stats: {}
    };

    if (itemData.statModifiers) {
        for (const stat in itemData.statModifiers) {
            const min = itemData.statModifiers[stat].min;
            const max = itemData.statModifiers[stat].max;
            const bonusValue = Math.random() * (max - min) + min;
            const bonusPercent = Math.round(bonusValue * 100);
            newItem.description = `+${bonusPercent}% de ${stat.toUpperCase()}`;
            newItem.stats[stat] = bonusValue;
        }
    }
    return newItem;
}

function setActiveMonster(monsterId) {
    // 1. Déséquiper l'ancien monstre actif
    const oldActiveMonster = getActiveMonster();
    if (oldActiveMonster) {
        Object.values(oldActiveMonster.equippedItems).forEach(item => {
            state.playerItems.push(item);
        });
        oldActiveMonster.equippedItems = {};
        validateMonsterHP(oldActiveMonster);
    }

    // 2. Définir le nouveau monstre actif
    state.activeMonsterId = monsterId;

    saveState(1);
    renderMain();
    renderInventory();
    showScreen('main');
}

// Achat d'énergies
function buyEnergy(){
    const cost = 50;
    
    if(state.gold < cost) {
        showModal('Pas assez d\'or', `Il faut ${cost} or.`);
        return;
    }
    
    if(state.energy >= ENERGY_MAX) {
        showModal('Énergie au max', 'Vous avez déjà le maximum d\'énergie !');
        return;
    }
    
    state.gold -= cost;
    state.energy = clamp(state.energy+1, 0, ENERGY_MAX);
    
    showModal('Achat d\'énergie', `Vous avez acheté 1 point d'énergie !`);
    
    renderMain();
    saveState(1);
}

// ===========================================================================================================================================
// XP & montée de niveau (CORRIGÉE)
// ===========================================================================================================================================

function gainXp(mon, xp) {
    state.dailyObjectives.forEach(obj => {
        if (obj.type === 'xp') {
            obj.current += Math.floor(xp);
        }
    });
    
    mon.xp += Math.floor(xp);
    
    while (mon.xp >= mon.xpNeeded) {
        mon.xp -= mon.xpNeeded;
        mon.level += 1;
        
        // Les bonus de niveau sont stockés dans statBonus (permanents)
        const baseStats = mon.baseStats;
        mon.statBonus.attack += Math.max(1, Math.floor(baseStats.attack * 0.1));
        mon.statBonus.defense += Math.max(1, Math.floor(baseStats.defense * 0.1));
        mon.statBonus.speed += 1;
        mon.statBonus.hp += Math.max(1, Math.floor(baseStats.hp * 0.15));
        
        // Récupération complète des HP après montée de niveau
        const finalStats = getFinalStats(mon);
        mon.hp = finalStats.hp;
        
        mon.xpNeeded = xpNeeded(mon.level);
        showModal('Niveau supérieur', `${mon.name} passe <b>niveau ${mon.level}</b> !`);
    }
    renderMain();
}

// ===========================================================================================================================================
// ZONE DE TOUR ET COMBAT (CORRIGÉE)
// ===========================================================================================================================================

// Tour & génération d'ennemis
function pickEnemySpecies(floor){
    if(floor > 0 && floor % 50 === 0){
        return choice(BOSS_SPECIES);
    }

    const roll = Math.random();
    if(floor > 15 && roll < 0.15) return choice(SPECIES.epic);
    if(floor > 5  && roll < 0.35) return choice(SPECIES.rare);
    return choice(SPECIES.common);
}

function scaleEnemyFromSpecies(species, floor){
    const foe = createMonsterFromSpecies(species);
    
    foe.isBoss = BOSS_SPECIES.some(boss => boss.name === foe.name);
    foe.level = Math.max(1, Math.floor(floor / 2));
    
    // Simule la montée de niveau pour que les ennemis gagnent des stats comme le joueur
    for (let i = 1; i < foe.level; i++) {
        foe.statBonus.attack += Math.max(1, Math.floor(foe.baseStats.attack * 0.1));
        foe.statBonus.defense += Math.max(1, Math.floor(foe.baseStats.defense * 0.1));
        foe.statBonus.speed += 1;
        foe.statBonus.hp += Math.max(1, Math.floor(foe.baseStats.hp * 0.15));
    }
    
    // Bonus de stats pour les boss
    if(foe.isBoss){
        foe.statBonus.hp = Math.floor(foe.statBonus.hp * 1.2);
        foe.statBonus.attack = Math.floor(foe.statBonus.attack * 1.2);
        foe.statBonus.defense = Math.floor(foe.statBonus.defense * 1.2);
        foe.statBonus.speed = Math.floor(foe.statBonus.speed * 1.1);
    }
  
    // Utilise la fonction unifiée pour calculer les stats finales
    const finalStats = getFinalStats(foe);
    foe.hp = finalStats.hp;

    return foe;
}

// Combat (tours + ATB bonus)
function startTowerRun(){
    if(state.energy <= 0) return showModal('Énergie insuffisante','Vous n\'avez plus d\'énergie.');
    const m = getActiveMonster(); 
    if(!m) return showModal('Aucun monstre','Activez un monstre.');
    
    if (m.maxFloor === undefined) {
        m.maxFloor = 0;
    }
    
    state.energy -= 1;
    // Utilise la fonction unifiée pour initialiser la vie du monstre
    const finalStats = getFinalStats(m);
    m.hp = finalStats.hp;
    state.currentFloor = 1;
    runNextFloor(m);
}

function runNextFloor(monster){
    const species = pickEnemySpecies(state.currentFloor);
    const foe = scaleEnemyFromSpecies(species, state.currentFloor);
    
    startBattle(monster, foe, (result, playerBattle, enemyBattle)=>{
        monster.hp = playerBattle.hp;

        if(result === 'win'){
            const rarityMult = foe.rarity==='epic' ? 2.0 : foe.rarity==='rare' ? 1.5 : 1.0;
            const xpGain = (foe.level * 2) * rarityMult;
            const goldGain = GOLD_PER_RARITY[foe.rarity];

            gainXp(monster, xpGain);

            state.gold += goldGain;
            
            // Mise à jour des objectifs
            state.dailyObjectives.forEach(obj => {
                if (obj.type === 'battles') {
                    obj.current += 1;
                }
                if (obj.type === 'floor' && state.currentFloor >= obj.value) {
                    obj.current = obj.value;
                }
            });
            
            monster.victories = (monster.victories || 0) + 1;
            checkEvolution(monster);

            if (state.currentFloor > monster.maxFloor) {
                monster.maxFloor = state.currentFloor;
            }

            // Loot de boss
            if (state.currentFloor > 0 && state.currentFloor % 50 === 0) {
                const dropChance = 20;
                if (Math.random() * 100 < dropChance) {
                    const itemData = BOSS_LOOT_TABLE[Math.floor(Math.random() * BOSS_LOOT_TABLE.length)];
                    const newItemInstance = createItemInstance(itemData);
                    state.playerItems.push(newItemInstance);
                    showModal('Victoire !', `Vous avez vaincu le boss et avez obtenu un objet : ${newItemInstance.name} ! ${newItemInstance.description}.`);
                } else {
                    showModal('Victoire !', `Vous avez vaincu le boss, mais n'avez pas obtenu l'objet rare. Retentez votre chance !`);
                }
            }

            state.currentFloor += 1;
            renderMain();
            runNextFloor(monster); 

        } else {
            // Gestion de la défaite
            if (monster.evolutionPending) {
                evolveMonster(monster, monster.evolvesTo);
                return;
            }

            // Récupération complète des HP
            const finalStats = getFinalStats(monster);
            monster.hp = finalStats.hp;
            state.currentFloor = 1;
            document.getElementById('backToMain').disabled = false;
            showModal('Fin de la run', `${monster.name} a été vaincu. Retour au menu.`);
            showScreen('main');
        }
    });
}

// Combat en lui même (CORRIGÉ)
function startBattle(player, enemy, onEnd){
    showScreen('battle');
    document.getElementById('battle-floor').textContent = state.currentFloor;
    const log = document.getElementById('battle-log');
    const arena = document.getElementById('battle-monsters');
    log.innerHTML = '';
    document.getElementById('backToMain').disabled = true;
    
    // reset ATB
    state.battle.atb.player = 0;
    state.battle.atb.enemy = 0;
    updateSpeedBtn();

    function renderBattle(){
        // Utilisation de la fonction unifiée pour obtenir les stats finales
        const finalPlayerStats = getFinalStats(player);
        const finalEnemyStats = getFinalStats(enemy);
        
        const pHP = clamp((player.hp/finalPlayerStats.hp)*100,0,100);
        const eHP = clamp((enemy.hp/finalEnemyStats.hp)*100,0,100);
        const pATB = clamp(state.battle.atb.player,0,ATB_FULL);
        const eATB = clamp(state.battle.atb.enemy,0,ATB_FULL);
        
        arena.innerHTML = `
            <div class="card">
                <img class="monster-img rarety-${player.rarity}" src="${player.image}" alt="${player.name}">
                <h3>${player.name} <span class="badge ${player.rarity}">${player.rarity.toUpperCase()}</span></h3>
                <div class="statline">Type ${player.type} — Nv ${player.level}</div>
                <div class="bar hpbar"><div class="hpfill" style="width:${pHP}%"></div></div>
                <div class="bar atbbar"><div class="atbfill" style="width:${(pATB/ATB_FULL)*100}%"></div></div>
                <div class="statline">ATQ ${finalPlayerStats.attack} • DEF ${finalPlayerStats.defense} • VIT ${finalPlayerStats.speed} • PV ${player.hp}/${finalPlayerStats.hp}</div>
            </div>
            <div class="card">
                <img class="monster-img rarety-${enemy.rarity}" src="${enemy.image}" alt="${enemy.name}">
                <h3>${enemy.name} <span class="badge ${enemy.rarity}">${enemy.rarity.toUpperCase()}</span></h3>
                <div class="statline">Type ${enemy.type} — Nv ${enemy.level}</div>
                <div class="bar hpbar"><div class="hpfill" style="width:${eHP}%"></div></div>
                <div class="bar atbbar"><div class="atbfill" style="width:${(eATB/ATB_FULL)*100}%"></div></div>
                <div class="statline">ATQ ${finalEnemyStats.attack} • DEF ${finalEnemyStats.defense} • VIT ${finalEnemyStats.speed} • PV ${enemy.hp}/${finalEnemyStats.hp}</div>
            </div>
        `;
    }
  
    function logLine(t){ log.innerHTML += `<div>• ${t}</div>`; log.scrollTop = log.scrollHeight; }

    // Dégâts avec affinités (CORRIGÉ)
    function dealDamage(attacker, defender, source){
        // Utilisation des statistiques finales pour le calcul des dégâts
        const attackerFinalStats = getFinalStats(attacker);
        const defenderFinalStats = getFinalStats(defender);

        const base = Math.max(1, attackerFinalStats.attack - defenderFinalStats.defense);
        const mult = typeMultiplier(attacker.type, defender.type);
        const dmg = Math.max(1, Math.floor(base * mult));
        
        defender.hp -= dmg;
        const tag = source==='ATB' ? ' (ATB !)' : '';
        const aff = mult>1 ? ' [avantage]' : mult<1 ? ' [désavantage]' : '';
        logLine(`${attacker.name} attaque ${defender.name}${tag} : -${dmg} PV${aff}`);
    }

    // Tours normaux (alternance) + ATB bonus en parallèle
    state.battle.running = true;
    renderBattle();

    let battleOver = false;

    function checkEnd(){
        if(enemy.hp <= 0){
            battleOver = true;
            clearInterval(state.battle.intervalId);
            state.battle.running = false;
            logLine(`${enemy.name} est vaincu !`);
            document.getElementById('backToMain').disabled = false;
            onEnd('win', player, enemy);
            return true;
        }
        if(player.hp <= 0){
            battleOver = true;
            clearInterval(state.battle.intervalId);
            state.battle.running = false;
            logLine(`${player.name} est vaincu…`);
            document.getElementById('backToMain').disabled = false;
            onEnd('lose', player, enemy);
            return true;
        }
        return false;
    }

    // Boucle de tours "classiques"
    function doTurn(){
        if(!state.battle.running) return;
        if(battleOver) return;
        
        // Joueur frappe
        dealDamage(player, enemy, 'TURN');
        renderBattle();
        if(checkEnd()) return;
        
        // Ennemi riposte
        setTimeout(()=>{
            if(battleOver) return;
            dealDamage(enemy, player, 'TURN');
            renderBattle();
            if(checkEnd()) return;
            
            const spd = SPEED_STEPS[state.battle.speedIndex];
            setTimeout(doTurn, 800 / spd);
        }, 400 / SPEED_STEPS[state.battle.speedIndex]);
    }
    setTimeout(doTurn, 600 / SPEED_STEPS[state.battle.speedIndex]);

    // ATB : tick parallèle qui peut déclencher des attaques bonus
    state.battle.intervalId = setInterval(()=>{
        if(!state.battle.running) return;
        const spd = SPEED_STEPS[state.battle.speedIndex];
        
        // Utilisation des statistiques finales pour le remplissage ATB
        const finalPlayerStats = getFinalStats(player);
        const finalEnemyStats = getFinalStats(enemy);
        
        state.battle.atb.player += finalPlayerStats.speed * ATB_FILL_BASE * spd * 0.1;
        state.battle.atb.enemy  += finalEnemyStats.speed  * ATB_FILL_BASE * spd * 0.1;
        
        if(state.battle.atb.player >= ATB_FULL){
            state.battle.atb.player -= ATB_FULL;
            dealDamage(player, enemy, 'ATB');
            renderBattle();
            if(checkEnd()) return;
        }
        if(state.battle.atb.enemy >= ATB_FULL){
            state.battle.atb.enemy -= ATB_FULL;
            dealDamage(enemy, player, 'ATB');
            renderBattle();
            if(checkEnd()) return;
        }
    }, ATB_TICK_MS / SPEED_STEPS[state.battle.speedIndex]);
}

// Appel du bouton et réglage du bouton VITESSE de combat
function toggleBattleSpeed(){
    state.battle.speedIndex = (state.battle.speedIndex + 1) % SPEED_STEPS.length;
    updateSpeedBtn();
}

function updateSpeedBtn(){
    const btn = document.getElementById('speedBtn');
    if(btn) btn.textContent = `⚡ Vitesse x${SPEED_STEPS[state.battle.speedIndex]}`;
}

// ===========================================================================================================================================
// Système de récupération d'énergie
// ===========================================================================================================================================

function startEnergyRegen(){
    if(state.energyTimer) clearInterval(state.energyTimer);
    state.energyTimer = setInterval(()=>{
        if(state.energy < ENERGY_MAX){
            state.energy += 1;
            renderMain();
        }
    }, ENERGY_REGEN_MS);
}

function checkOfflineEnergyRegen() {
    // Vérifie si un horodatage de connexion existe
    if (state.lastLoginTime) {
        const now = Date.now();
        const timeElapsed = now - state.lastLoginTime; // Temps écoulé en millisecondes
        
        // Calcule la quantité d'énergie à régénérer
        // ENERGY_REGEN_MS est une constante que vous avez déjà
        const energyToRegen = Math.floor(timeElapsed / ENERGY_REGEN_MS); 
        
        if (energyToRegen > 0) {
            const oldEnergy = state.energy;
            state.energy = Math.min(state.energy + energyToRegen, ENERGY_MAX);
            
            // Affiche un message pour le joueur
            if (state.energy > oldEnergy) {
                showModal('Régénération d\'énergie !', `Vous avez récupéré ${state.energy - oldEnergy} énergie pendant votre absence !`);
            }
        }
    }
    // Met à jour le dernier horodatage pour la prochaine fois
    state.lastLoginTime = Date.now();
    saveState(1);
}

// ----------------------------------------------------------- VENTE DE MONSTRE-----------------------------------------------------------

// Vendre un monstre
function sellMonster(monsterId) {
    const monsterIndex = state.playerMonsters.findIndex(m => m.id === monsterId);
    const monster = state.playerMonsters[monsterIndex];

    if (!monster || state.activeMonsterId === monster.id) {
        showModal("Impossible", "Vous ne pouvez pas vendre votre monstre actif !");
        return;
    }
    
    const basePrice = getMonsterBasePrice(monster);
    const sellPrice = Math.floor(basePrice * MONSTER_SELL_RATE);
    
    const confirmation = window.confirm(`Voulez-vous vraiment vendre ${monster.name} pour ${sellPrice} or ?`);
    
    if (confirmation) {
        state.gold += sellPrice;
        state.playerMonsters.splice(monsterIndex, 1);
        saveState(1);

        renderMain();
        renderCollection(); 
        showModal('Monstre vendu', `${monster.name} a été vendu pour ${sellPrice} or.`);
    }
}

// Fonction utilitaire pour calculer le prix de base d'un monstre
function getMonsterBasePrice(monster) {
    const eggCost = getEggCost();
    let rarityMultiplier = 1;
    switch (monster.rarity) {
        case 'common': rarityMultiplier = 0.25; break;
        case 'rare': rarityMultiplier = 0.5; break;
        case 'epic': rarityMultiplier = 1.2; break;
        default: rarityMultiplier = 0.25;
    }
    return Math.floor(eggCost * rarityMultiplier);
}

// CODE SERVANT A LA MISE EN PLACE DU TRI DES PETITS MONSTRES DANS LA COLLECTION
function sortMonsters(criteria) {
    state.playerMonsters.sort((a, b) => {
        switch (criteria) {
            case 'level':
                return b.level - a.level;
            case 'rarity':
                const rarityOrder = { epic: 3, rare: 2, common: 1 };
                return rarityOrder[b.rarity] - rarityOrder[a.rarity];
            case 'type':
                if (a.type < b.type) return -1;
                if (a.type > b.type) return 1;
                return 0;
            case 'name':
                if (a.name < b.name) return -1;
                if (a.name > b.name) return 1;
                return 0;
            default:
                return b.level - a.level;
        }
    });
    renderCollection();
}

// ===========================================================================================================================================
// PROCESSUS D'ÉVOLUTION (CORRIGÉ)
// ===========================================================================================================================================

// Trouve les données d'une espèce de monstre par son ID
function getSpeciesDataById(speciesId) {
    if (EVOLVED_SPECIES[speciesId]) {
        return EVOLVED_SPECIES[speciesId];
    }
    
    for (const rarity in SPECIES) {
        const found = SPECIES[rarity].find(s => s.id === speciesId);
        if (found) {
            return found;
        }
    }
    return null;
}

// Vérifie si le monstre peut évoluer
function checkEvolution(monster) {
    const evolutionInfo = EVOLUTIONS[monster.species];
    if (!evolutionInfo) {
        return;
    }

    const conditions = evolutionInfo.condition;
    let allConditionsMet = true;

    if (conditions.level && monster.level < conditions.level) {
        allConditionsMet = false;
    }
    if (conditions.victories && monster.victories < conditions.victories) {
        allConditionsMet = false;
    }
    
    if (allConditionsMet) {
        monster.evolutionPending = true;
        monster.evolvesTo = evolutionInfo.evolvesTo;
    }
}

// Effectue le processus d'évolution (CORRIGÉ)
function evolveMonster(monster, newSpeciesId) {
    const newSpeciesData = getSpeciesDataById(newSpeciesId);

    if (!newSpeciesData) {
        console.error("L'espèce évoluée n'a pas été trouvée :", newSpeciesId);
        return;
    }
    
    const oldName = monster.name;

    showScreen('evolution');

    const evolutionImage = document.getElementById('evolution-monster-image');
    evolutionImage.src = monster.image;
    evolutionImage.classList.add('evolve-animation');

    setTimeout(() => {
        monster.species = newSpeciesId;
        monster.name = newSpeciesData.name;
        monster.image = newSpeciesData.image;
        monster.rarity = newSpeciesData.rarity;
        monster.type = newSpeciesData.type;
        monster.evolutionPending = false;

        // Met à jour les stats de base avec les stats de la nouvelle espèce
        monster.baseStats.attack = newSpeciesData.attack;
        monster.baseStats.defense = newSpeciesData.defense;
        monster.baseStats.speed = newSpeciesData.speed;
        monster.baseStats.hp = newSpeciesData.hp;

        // Récupération complète des HP avec les nouvelles stats
        const finalStats = getFinalStats(monster);
        monster.hp = finalStats.hp;


        evolutionImage.src = monster.image;
        evolutionImage.classList.remove('evolve-animation');

        document.getElementById('evolution-message').textContent = `${oldName} a évolué en ${newSpeciesData.name} !`;

        document.getElementById('backToMainFromEvolution').onclick = () => {
            showScreen('main');
            renderMain();
        };

        saveState(1);
        renderMain();
    }, 4000); 
}

// Génère un ID unique pour chaque monstre
function createId() {
    return 'id-' + Date.now() + '-' + Math.random().toString(36).substr(2, 9);
}

// ===========================================================================================================================================
// OBJECTIFS JOURNALIERS
// ===========================================================================================================================================

// Fonction pour choisir aléatoirement des objectifs uniques
function generateDailyObjectives() {
    const objectivesToGenerate = 3;
    const selectedObjectives = [];
    const availableObjectives = [...DAILY_OBJECTIVES];

    for (let i = 0; i < objectivesToGenerate; i++) {
        if (availableObjectives.length === 0) break;
        const randomIndex = Math.floor(Math.random() * availableObjectives.length);
        const objective = availableObjectives.splice(randomIndex, 1)[0];
        selectedObjectives.push(objective);
    }
    
    state.dailyObjectives = selectedObjectives.map(obj => ({
        ...obj,
        current: 0
    }));
    
    state.lastObjectiveReset = new Date().toDateString();
    saveState(1);
}

// Affiche l'écran des objectifs quotidiens
function renderObjectives() {
    let html = '<h2>Objectifs du jour</h2>';
    state.dailyObjectives.forEach(obj => {
        const isCompleted = obj.current >= obj.value;
        const progress = isCompleted ? 'Complété !' : `${obj.current}/${obj.value}`;
        const buttonText = isCompleted ? 'Réclamer' : 'En cours...';
        const buttonDisabled = isCompleted ? '' : 'disabled';

        html += `
            <div class="objective-card">
                <h3>${obj.name}</h3>
                <p>${obj.description.replace('{value}', obj.value)}</p>
                <div class="progress-bar-container">
                    <div class="progress-bar" style="width:${(obj.current / obj.value) * 100}%"></div>
                </div>
                <div class="objective-progress">${progress}</div>
                <button ${buttonDisabled} onclick="claimObjective('${obj.id}')">${buttonText}</button>
            </div>
        `;
    });
    
    html += `<button class="btn" onclick="showScreen('main')">Retour</button>`;

    document.getElementById('objectives-screen').innerHTML = html;
}

// Fonction pour réclamer un objectif
function claimObjective(id) {
    const obj = state.dailyObjectives.find(o => o.id === id);
    if (!obj || obj.current < obj.value) {
        return;
    }
    
    state.gold += obj.reward;
    showModal('Récompense !', `Vous avez gagné ${obj.reward} or pour avoir complété l'objectif !`);
    
    state.dailyObjectives = state.dailyObjectives.filter(o => o.id !== id);
    
    saveState(1);
    renderObjectives();
}

// ===========================================================================================================================================
// --------------------------------------------------------PRINCIPE D'UTILISATION D'UN OBJET----------------------------------------------------------
// ===========================================================================================================================================

// Fonction pour utiliser un objet
function useItem(uniqueId) {
    const itemIndex = state.playerItems.findIndex(i => i.uniqueId === uniqueId);
    if (itemIndex === -1) {
        console.error('Erreur: L\'objet n\'existe pas dans l\'inventaire.');
        showModal('Erreur', 'Cet objet n\'existe plus dans votre inventaire.');
        return;
    }
    
    const item = state.playerItems[itemIndex];
    const activeMonster = getActiveMonster();
    
    // Gestion des différents types d'objets consommables
    switch (item.type) {
        case 'xp':
            if (!activeMonster) {
                showModal('Erreur', 'Vous devez avoir un monstre actif pour utiliser cet objet.');
                return;
            }
            gainXp(activeMonster, item.bonus);
            state.playerItems.splice(itemIndex, 1);
            showModal('Objet utilisé', `Vous avez utilisé un ${item.name} ! ${activeMonster.name} a gagné ${item.bonus} XP.`);
            break;
            
        case 'energy':
            const energyGained = Math.min(item.bonus, ENERGY_MAX - state.energy);
            state.energy += energyGained;
            state.playerItems.splice(itemIndex, 1);
            showModal('Objet utilisé', `Vous avez utilisé un ${item.name} ! Vous avez récupéré ${energyGained} énergie.`);
            break;
            
        default:
            showModal('Erreur', 'Cet objet ne peut pas être utilisé directement. Essayez de l\'équiper.');
            return;
    }
    
    saveState(1);
    renderMain();
    renderInventory();
}

// ==============================================================================================================================================
// ----------------------------------------------------- JEUX DE CHANCE JOURNALIER----------------------------------------------------------
// ==========================================================================================================================================

const REWARD_PROBABILITIES = {
    gold200: 0.30,  // 5% de chance de gagner 200 or
    gold500: 0.20,  // 10% de chance de gagner 500 or
    gold1000: 0.05, // 10% de chance de gagner 1000 or
    xp_boost_200: 0.15, // 5% de chance de gagner un jeton de 200 xp
    xp_boost_500: 0.10, // 10% de chance de gagner un jeton de 500 xp
    energyboost10: 0.15, // 5% de chance de gagner un jeton d'énergie
    mysteryEgg: 0.05  // 55% de chance de gagner un œuf mystère
};

const REWARD_IMAGES = {
    gold200: 'image/items/gold200.png',
    gold500: 'image/items/gold500.png',
    gold1000: 'image/items/gold1000.png',
    xp_boost_200: 'image/items/xp200.png',
    xp_boost_500: 'image/items/xp500.png',
    energyboost10: 'image/items/energy10.png',
    mysteryEgg: 'image/oeuf-mystere.png' // Corrigé pour correspondre à ton code précédent
};

const REWARD_NAMES = {
    gold200: '200 Or',
    gold500: '500 Or',
    gold1000: '1000 Or',
    xp_boost_200: '1 Jeton XP (200)',
    xp_boost_500: '1 Jeton XP (500)',
    energyboost10: '1 Jeton Énergie',
    mysteryEgg: 'Un œuf mystère'
};

// --- FONCTIONS POUR LA MACHINE A SOUS À UNE ROUE ---

// Initialise la roue avec des symboles
function initSlotsScreen() {
    const reel = document.getElementById('slots-reel');
    const rewards = Object.keys(REWARD_IMAGES);
    reel.innerHTML = ''; // Nettoie le contenu précédent
    
    // Crée un conteneur interne pour les symboles
    const reelContent = document.createElement('div');
    reelContent.className = 'reel-content';
    
    // CORRECTION 5: Crée une distribution équilibrée des symboles
    const symbolCount = 60;
    const symbolsPerReward = Math.floor(symbolCount / rewards.length);
    const symbolOrder = [];
    
    // Ajoute chaque récompense plusieurs fois pour une meilleure distribution
    for (let i = 0; i < symbolCount; i++) {
        const rewardIndex = i % rewards.length;
        const reward = rewards[rewardIndex];
        symbolOrder.push(reward);
    }
    
    // Mélange l'ordre pour plus de variété
    for (let i = symbolOrder.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [symbolOrder[i], symbolOrder[j]] = [symbolOrder[j], symbolOrder[i]];
    }
    
    // Crée les éléments DOM pour chaque symbole
    symbolOrder.forEach((reward, index) => {
        const symbolDiv = document.createElement('div');
        symbolDiv.className = 'slot-symbol';
        symbolDiv.dataset.reward = reward;
        
        // Vérifie si l'image existe
        if (!REWARD_IMAGES[reward]) {
            console.error(`Image manquante pour la récompense: ${reward}`);
            symbolDiv.innerHTML = `<span>Erreur: ${reward}</span>`;
        } else {
            symbolDiv.innerHTML = `<img src="${REWARD_IMAGES[reward]}" alt="${reward}" class="slot-image" onerror="console.error('Erreur de chargement de l\'image: ${REWARD_IMAGES[reward]}')">`;
        }
        
        reelContent.appendChild(symbolDiv);
    });
    
    console.log('Ordre des symboles générés:', symbolOrder);
    
    reel.appendChild(reelContent);

    // Réinitialise la position du contenu
    reelContent.style.transition = 'none';
    reelContent.style.transform = 'translateY(0)';

    // Désactiver le bouton si la roulette a déjà été utilisée aujourd'hui
    const spinButton = document.getElementById('spin-button');
    const today = new Date().toDateString();
    if (state.lastSlotsSpin === today) {
        spinButton.disabled = true;
        spinButton.textContent = 'Déjà utilisé aujourd\'hui';
    } else {
        spinButton.disabled = false;
        spinButton.textContent = 'Tenter ma chance !';
    }

    // === Gestion du bouton ticket ===
    const ticketBtn = document.getElementById('ticket-spin-button');
    const hasTicket = state.playerItems.some(item => item.id === 'ticketroulette');

    if (hasTicket) {
        ticketBtn.classList.remove('hidden');
        ticketBtn.disabled = false;
        ticketBtn.textContent = "Utiliser un ticket";
        // ✨ Ajoute la pulsation
        ticketBtn.classList.add("attention");
    } else {
        ticketBtn.classList.add('hidden');
        // ❌ Retire la pulsation
        ticketBtn.classList.remove("attention");
    }

    // Branche l’action ticket
    ticketBtn.onclick = useTicketSpin;
}

// Donne la récompense au joueur
function giveReward(rewardType) {
    let message = `Vous avez gagné ${REWARD_NAMES[rewardType]} !`;

    switch (rewardType) {
        case 'gold200':
            state.gold += 200;
            break;
        case 'gold500':
            state.gold += 500;
            break;
        case 'gold1000':
            state.gold += 1000;
            break;
        case 'xp_boost_200':
        case 'xp_boost_500':
        case 'energyboost10':
            // Trouve l'objet correspondant dans ITEMS
            const itemData = ITEMS.find(item => item.id === rewardType);
            if (!itemData) {
                console.error(`Erreur: Item ${rewardType} non trouvé dans ITEMS.`);
                showModal('Erreur', 'Une erreur est survenue lors de la récompense.');
                return;
            }
            // Crée une instance complète avec uniqueId
            const newItem = {
                ...itemData,
                uniqueId: 'item_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9)
            };
            state.playerItems.push(newItem);
            message = `Vous avez gagné ${itemData.name} !`;
            break;
        case 'mysteryEgg':
            // Logic pour faire éclore l'œuf mystère
            const roll = Math.random();
            let selectedRarity = '';
            
            if (roll < EGG_PROBABILITIES.epic) {
                selectedRarity = 'epic';
            } else if (roll < EGG_PROBABILITIES.epic + EGG_PROBABILITIES.rare) {
                selectedRarity = 'rare';
            } else {
                selectedRarity = 'common';
            }

            const randomSpecies = choice(SPECIES[selectedRarity]);
            const newMonster = createMonsterFromSpecies(randomSpecies);
            
            state.playerMonsters.push(newMonster);
            
            // Met à jour les objectifs quotidiens
            state.dailyObjectives.forEach(obj => {
                if (obj.type === 'capture') {
                    obj.current += 1;
                }
            });

            message = `L'œuf a éclos ! Vous avez obtenu un ${newMonster.rarity} ${newMonster.name} !`;
            break;
    }
    
    showModal('Jackpot !', message);
    saveState(1);
    renderMain();
}

// 🔧 Logique commune du spin (animation + récompense)
// markDailyUsed = true  -> spin quotidien (on marque l'usage du jour)
// markDailyUsed = false -> spin via ticket (on NE touche PAS au timer)
function performSlotsSpin(markDailyUsed) {
    const spinButton = document.getElementById('spin-button');
    const reel = document.getElementById('slots-reel');
    const reelContent = reel.querySelector('.reel-content');
    const today = new Date().toDateString();

    // L'état AVANT le spin (utile pour restaurer le bouton si spin via ticket)
    const hadFreeSpin = state.lastSlotsSpin !== today;

    // --- Sons ---
    const spinSound = new Audio('sounds/machine-a-sous-en-mouvement.mp3');
    const victorySound = new Audio('sounds/machine-a-sous-victoire.mp3');
    spinSound.loop = true;
    spinSound.volume = 0.6;
    victorySound.volume = 0.8;

    // Désactive le bouton principal le temps de l’animation
    if (spinButton) {
        spinButton.disabled = true;
        spinButton.textContent = 'En cours...';
    }

    // Lancer le son de rotation
    spinSound.play().catch(e => console.log('Erreur son rotation:', e));

    // Effet visuel
    reelContent.classList.add('spinning');

    // --- Sélection de la récompense ---
    const result = choiceWithProbabilities(REWARD_PROBABILITIES);

    // Trouver/poser le symbole gagnant
    const symbols = reelContent.querySelectorAll('.slot-symbol');
    const totalSymbols = symbols.length;

    let winningIndex = -1;
    const startSearch = Math.floor(totalSymbols * 0.3);
    const endSearch = Math.floor(totalSymbols * 0.7);

    for (let i = startSearch; i < endSearch; i++) {
        if (symbols[i] && symbols[i].dataset.reward === result) {
            winningIndex = i;
            break;
        }
    }

    // Si on n'a pas trouvé, on force un emplacement gagnant
    if (winningIndex === -1) {
        winningIndex = startSearch + Math.floor(Math.random() * (endSearch - startSearch));
        if (symbols[winningIndex]) {
            symbols[winningIndex].dataset.reward = result;
            const imgElement = symbols[winningIndex].querySelector('img');
            if (imgElement && REWARD_IMAGES[result]) {
                imgElement.src = REWARD_IMAGES[result];
                imgElement.alt = result;
            }
        }
    }

    // --- Animation ---
    const symbolHeight = 50; // doit correspondre à ton CSS
    const containerHeight = 150;
    const centerOffset = (containerHeight / 2) - (symbolHeight / 2);
    const fullRotations = Math.floor(Math.random() * 3) + 3; // 3 à 5 tours
    const fullRotationDistance = fullRotations * containerHeight;
    const finalPosition = -(winningIndex * symbolHeight) + centerOffset;
    const totalTranslateY = -(fullRotationDistance + Math.abs(finalPosition));

    // Phase 1
    reelContent.style.transition = 'transform 2.5s cubic-bezier(0.25, 0.1, 0.25, 1)';
    reelContent.style.transform = `translateY(${totalTranslateY}px)`;

    // Phase 2
    setTimeout(() => {
        reelContent.style.transition = 'transform 1.5s cubic-bezier(0.23, 1, 0.320, 1)';
        reelContent.style.transform = `translateY(${finalPosition}px)`;
    }, 2500);

    // Fin d'animation → récompense & UI
    setTimeout(() => {
        // Stop son rotation, jouer victoire
        spinSound.pause();
        spinSound.currentTime = 0;
        victorySound.play().catch(e => console.log('Erreur son victoire:', e));

        // Donner la récompense
        giveReward(result);

        // Marquage du timer ou non
        if (markDailyUsed) {
            // spin quotidien
            state.lastSlotsSpin = today;
            if (spinButton) {
                spinButton.disabled = true;
                spinButton.textContent = 'Déjà utilisé aujourd\'hui';
            }
            saveState(1);
        } else {
            // spin via ticket : ne touche pas au timer !
            // On restaure l'état du bouton selon s'il reste le spin gratuit du jour
            if (spinButton) {
                if (hadFreeSpin) {
                    spinButton.disabled = false;
                    spinButton.textContent = 'Tenter ma chance !';
                } else {
                    spinButton.disabled = true;
                    spinButton.textContent = 'Déjà utilisé aujourd\'hui';
                }
            }
        }

        // Highlight du symbole gagnant
        reelContent.classList.remove('spinning');
        symbols.forEach((symbol, index) => {
            if (index === winningIndex) symbol.classList.add('winning-symbol');
            else symbol.classList.remove('winning-symbol');
        });
    }, 4000); // 2.5s + 1.5s
}



// Lance l'animation et donne la récompense
function spinSlots() {
    const today = new Date().toDateString();
    if (state.lastSlotsSpin === today) {
        showModal('Limite atteinte', 'Vous avez déjà utilisé la roulette aujourd\'hui. Revenez demain !');
        return;
    }
    // On lance la logique commune en marquant l'usage du jour
    performSlotsSpin(true);
}


function useTicketSpin() {
    const ticketIndex = state.playerItems.findIndex(item => item.id === 'ticketroulette');
    if (ticketIndex === -1) {
        showModal("Erreur", "Vous n'avez pas de ticket !");
        return;
    }

    // Consommer un ticket
    state.playerItems.splice(ticketIndex, 1);
    saveState(1);
    renderInventory();

    // Met à jour uniquement la visibilité du bouton ticket (sans réinitialiser la roue)
    const ticketBtn = document.getElementById('ticket-spin-button');
    const stillHasTicket = state.playerItems.some(item => item.id === 'ticketroulette');
    if (ticketBtn) {
        if (stillHasTicket) {
            ticketBtn.classList.remove('hidden');
            ticketBtn.disabled = false;
            ticketBtn.textContent = "Utiliser un ticket";
        } else {
            ticketBtn.classList.add('hidden');
        }
    }

    // 🔥 Lance la roulette SANS appliquer la limite quotidienne
    performSlotsSpin(false);
}



// Fonction utilitaire pour choisir un élément en fonction des probabilités
function choiceWithProbabilities(probs) {
    const rand = Math.random();
    let cumulative = 0;
    for (const item in probs) {
        cumulative += probs[item];
        if (rand < cumulative) {
            return item;
        }
    }
}

document.getElementById('spin-button').addEventListener('click', spinSlots);


// =============================================================================================================================================
// INITIALISATION DU JEU
// ===========================================================================================================================================

function init() {
    const hasSavedGame = localStorage.getItem('monsterBreederState_slot1') !== null;

    if (hasSavedGame) {
        loadState(1); 
        if (state.lastObjectiveReset !== new Date().toDateString()) {
            generateDailyObjectives();
        }
        showModal('Partie chargée', 'La sauvegarde 1 a été chargée !');
    } else {
        startNewGame();
    }

    if (state.playerMonsters && state.playerMonsters.length > 0) {
        showScreen('main');
    } else {
        showScreen('home');
    }
}

function bootstrap() {
    startEnergyRegen();
    showScreen('home');
    checkSavedGameAndShowButton();
}

// ===========================================================================================================================================
// PARTIE SAUVEGARDE ET CHARGEMENT
// ===========================================================================================================================================

function checkSavedGameAndShowButton() {
    const hasSavedGame = localStorage.getItem('monsterBreederState_slot1') !== null ||
                         localStorage.getItem('monsterBreederState_slot2') !== null ||
                         localStorage.getItem('monsterBreederState_slot3') !== null;
    if (hasSavedGame) {
        document.getElementById('continue-button').style.display = 'block';
    }
}

// Navigation par défaut vers l'accueil
window.addEventListener('load', ()=>{
    showScreen('home');
    bootstrap();
});

// Fonction pour sauvegarder l'état du jeu dans un emplacement spécifique
function saveState(slotId = 1) {
    localStorage.setItem(`monsterBreederState_slot${slotId}`, JSON.stringify(state));
}

// Fonction pour charger l'état du jeu à partir d'un emplacement spécifique
function loadState(slotId) {
    const savedState = localStorage.getItem(`monsterBreederState_slot${slotId}`);
    if (savedState) {
        state = JSON.parse(savedState);
        if (!state.lastLoginTime) {
            state.lastLoginTime = Date.now();
        }
        if (!state.dailyObjectives) {
            state.dailyObjectives = [];
        }
        // Migration : Corriger les items de boss avec id au lieu de uniqueId
        state.playerItems.forEach(item => {
            if (item.id && !item.uniqueId) {
                item.uniqueId = item.id;
                delete item.id; // Optionnel
            }
        });
        checkOfflineEnergyRegen();
        showModal('Partie chargée', `La sauvegarde ${slotId} a été chargée avec succès !`);
        renderMain();
    } else {
        showModal('Aucune sauvegarde', `Il n'y a pas de sauvegarde dans l'emplacement ${slotId}.`);
    }
}

// Nouvelle fonction pour réinitialiser un emplacement de sauvegarde
function resetState(slotId) {
    localStorage.removeItem(`monsterBreederState_slot${slotId}`);
    showModal('Sauvegarde effacée', `L'emplacement ${slotId} a été effacé.`);
}

// Affiche une pop-up pour choisir un emplacement de sauvegarde/chargement
function showSaveLoadModal() {
    const modalContent = document.getElementById('modal-content');
    
    const buttonsHtml = [1, 2, 3].map(slot => {
        const saved = localStorage.getItem(`monsterBreederState_slot${slot}`);
        const isSaved = saved !== null;
        const saveLoadText = isSaved ? 'Charger' : 'Nouvelle Partie';
        const resetButton = isSaved ? `<button class="btn-mini" onclick="resetAndReload(${slot})">✖️</button>` : '';

        return `
            <div class="slot-container">
                <h3>Emplacement ${slot}</h3>
                <button class="btn" onclick="saveGame(${slot})">💾 Sauvegarder</button>
                <button class="btn" onclick="loadGame(${slot})">${saveLoadText}</button>
                ${resetButton}
            </div>
        `;
    }).join('');

    modalContent.innerHTML = `
        <h2>Sauvegarder / Charger</h2>
        ${buttonsHtml}
        <button class="btn" onclick="closeModal()">Fermer</button>
    `;

    document.getElementById('modal').classList.remove('hidden');
}

// Fonctions pour gérer les actions des boutons
function saveGame(slot) {
    saveState(slot);
    showModal('Partie sauvegardée', `Votre partie a été sauvegardée dans l'emplacement ${slot}.`);
}

function loadGame(slot) {
    closeModal();
    loadState(slot);
    if (state.lastObjectiveReset !== new Date().toDateString()) {
        generateDailyObjectives();
        showModal('Nouveaux objectifs !', 'De nouveaux objectifs quotidiens sont disponibles !');
    }
    showScreen('main');
    toggleMusic();
    document.getElementById('game-music').volume = 0.5;
}

function resetAndReload(slot) {
    resetState(slot);
    showSaveLoadModal();
}

// ------------------------------------------------DEBUT DE NOUVELLE PARTIE ET SES DATABASE-----------------------------------------------------
function startNewGame() {
    state = {
        gold: 50,
        energy: ENERGY_MAX,
        currentFloor: 1,
        playerMonsters: [],
        activeMonsterId: null,
        energyTimer: null,
        battle: {
            running: false,
            speedIndex: 0,
            atb: { player: 0, enemy: 0 },
            intervalId: null
        },
        playerItems: [],
        dailyObjectives: [],
        lastObjectiveReset: null,
        lastSlotsSpin: null,
        lastLoginTime: Date.now(),
    };
    
    // Donne un monstre de départ
    const sp = choice(SPECIES.common);
    const mon = createMonsterFromSpecies(sp);
    state.playerMonsters.push(mon);
    state.activeMonsterId = mon.id;
    generateDailyObjectives();
    checkOfflineEnergyRegen(); // Juste pour être sûr que l'horodatage est bien mis à jour à la première connexion
    saveState(1);
    
    showModal('Bienvenue !', `Vous recevez ${mon.name} pour commencer votre aventure !`);
    showScreen('main'); 
    renderMain();
    toggleMusic();
    document.getElementById('game-music').volume = 0.5;
}

// Vérifie au chargement de la page si une sauvegarde existe
window.onload = function() {
    const hasSavedGame = localStorage.getItem('monsterBreederState_slot1') !== null;
    if (hasSavedGame) {
        document.getElementById('continue-button').style.display = 'block';
    }
};

// GESTION DE LA MUSIQUE
function toggleMusic() {
    const music = document.getElementById('game-music');
    const musicToggleText = document.getElementById('music-toggle');
    
    if (music.paused) {
        music.play();
        musicToggleText.textContent = 'ON';
    } else {
        music.pause();
        musicToggleText.textContent = 'OFF';
    }
}

// Fonction pour changer le volume de la musique
function changeVolume() {
    const music = document.getElementById('game-music');
    const slider = document.getElementById('volume-slider');
    music.volume = slider.value;
}