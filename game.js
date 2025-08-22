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
// const EGG_COST = 20; // Coût unique pour l'œuf mystère
const EGG_PROBABILITIES = {
  common: 0.70, // 70% de chance d'avoir un monstre commun pour l'oeuf mystère
  rare: 0.25,   // 25% de chance d'avoir un monstre rare
  epic: 0.05    // 5% de chance d'avoir un monstre épique
};

// ---------------------------------------------- CONSTANTE POUR LETYPE DE PETIT MONSTRE----------------------------------------------------------

const TYPE_ADV = { // Tablleau des avantages simple par type
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
  // Ajoutez d'autres boss ici
];
// ----------------------------------------------Database Evolution et principe d'évolution--------------------------------------------------------------------
const EVOLVED_SPECIES = {
    // La clé est l'ID de la nouvelle forme évoluée
    'hydrolette': { id: 'hydrolette', name: 'Hydrolette', type: 'eau', rarity: 'common', attack: 15, defense: 10, speed: 8, hp: 25, image: "image/Eau/hydrolette.png" },
    'pyronis': { id: 'pyronis', name: 'Pyronis', type: 'feu', rarity: 'common', attack: 20, defense: 8, speed: 8, hp: 25, image: "image/Feu/pyronis.png" },
    'mycolos': { id: 'mycolos', name: 'Mycolos', type: 'plante', rarity: 'common', attack: 14, defense: 17, speed: 8, hp: 25, image: "image/Plante/mycolos.png" },
    'terrelet': { id: 'terrelet', name: 'Terrelet', type: 'terre', rarity: 'common', attack: 15, defense: 15, speed: 8, hp: 25, image: "image/Terre/terrelet.png" },
    'volcalave': { id: 'volcalave', name: 'Volcalave', type: 'feu', rarity: 'epic', attack: 27, defense: 21, speed: 8, hp: 33, image: "image/Feu/volcalave.png" },
    'fulminoir': { id: 'fulminoir', name: 'Fulminoir', type: 'feu', rarity: 'rare', attack: 23, defense: 15, speed: 8, hp: 27, image: "image/Feu/fulminoir.png" },
    'sirenalia': { id: 'sirenalia', name: 'Sirenalia', type: 'eau', rarity: 'rare', attack: 22, defense: 15, speed: 8, hp: 27, image: "image/Eau/sirenalia.png" },
    'vaguesenior': { id: 'vaguesenior', name: 'Vague Sénior', type: 'eau', rarity: 'common', attack: 17, defense: 12, speed: 8, hp: 25, image: "image/Eau/vaguesenior.png" },
    'vegetoss': { id: 'vegetoss', name: 'Vegetoss', type: 'plante', rarity: 'common', attack: 16, defense: 14, speed: 8, hp: 25, image: "image/Plante/vegetoss.png" },
    'squirfeuil': { id: 'squirfeuil', name: 'Squirfeuil', type: 'plante', rarity: 'rare', attack: 19, defense: 19, speed: 8, hp: 27, image: "image/Plante/vegetoss.png" },
};

const EVOLUTIONS = {
    // La clé est l'ID du monstre de base (qui a un ID dans SPECIES)
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
    // Ajoutez d'autres évolutions ici (ex: 'braizon' évolue en 'salamandre')
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
];

// ---------------------------------------------------------ITEMS DE VICTOIRE DE BOSS-------------------------------------------------------------------
const BOSS_LOOT_TABLE = [
    {id: 'ancient_amulet', name: 'Amulette Ancienne', type: 'speed', statModifiers: { speed: { min: 0.15, max: 0.30 } }, price: 5000, rarity: 'legendary', image: 'image/items/amuletteancienne.png', description: '',},
    {id: 'legendary_sword',name: 'Épée Légendaire',type: 'attack',statModifiers: { attack: { min: 0.10, max: 0.20 } },price: 5000,rarity: 'legendary',image: 'image/items/épéelégendaire.png', description: '', },
    {id: 'bouclierlegendaire',name: 'Bouclier Légendaire',type: 'defense',statModifiers: { defense: { min: 0.10, max: 0.20 } },price: 5000,rarity: 'legendary',image: 'image/items/bouclierlegendaire.png', description: '', },
    {id: 'coeureternite',name: 'Coeur éternel',type: 'hp',statModifiers: { hp: { min: 0.10, max: 0.20 } },price: 5000,rarity: 'legendary',image: 'image/items/coeureternite.png', description: '', },
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

// ----------------------------- Constantes pour les amélioration de la Boutique------------------------------------------------------------
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
  dailyObjectives: [], // Tableau pour les objectifs du jour
  lastObjectiveReset: null, // Horodatage de la dernière réinitialisation
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
}

// -------------------------------------------------Pop up de message--------------------------------------------------------------------------

function showModal(title, text, confirmCallback = null) {
  const modal = document.getElementById("modal");
  const modalContent = document.getElementById("modal-content");
  
  // Créer le HTML du modal de manière dynamique
  let modalHtml = `<h3>${title}</h3><p>${text}</p>`;

  if (confirmCallback) {
    // Si une fonction de rappel est fournie, afficher les boutons Confirmer et Annuler
    modalHtml += `<div class="modal-buttons"><button class="btn" onclick="confirmModal()">Confirmer</button><button class="btn btn-mini" onclick="closeModal()">Annuler</button></div>`;
    // Stocker la fonction de rappel pour l'exécution
    window.confirmModal = confirmCallback;
  } else {
    // Si aucune fonction de rappel n'est fournie, afficher un bouton pour fermer
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

// ------------------------------------------------------######-----------------------------------------------------------------------------

function getSpecies(monsterName) {
  for (const rarity in SPECIES) {
    const found = SPECIES[rarity].find(species => species.name === monsterName);
    if (found) {
      return found;
    }
  }
  return null;
}

// -------------------------------- Création d'un monstre depuis une espèce fixe avec variabilité----------------------------------------------

function createMonsterFromSpecies(species) {
    const spdBase = species.rarity === 'epic' ? 8 : species.rarity === 'rare' ? 6 : 5;

    // Variabilité des stats : ±20% des valeurs de base
    const variance = 0.2;
    const randomStat = (baseStat) => {
        const min = Math.floor(baseStat * (1 - variance));
        const max = Math.floor(baseStat * (1 + variance));
        return Math.max(1, rand(min, max)); // Minimum de 1
    };

    const randomHp = (baseHp) => {
        const min = Math.floor(baseHp * (1 - variance));
        const max = Math.floor(baseHp * (1 + variance));
        return Math.max(10, rand(min, max)); // Minimum de 10 PV
    };

    const attack = randomStat(species.attack);
    const defense = randomStat(species.defense);
    const speed = Math.max(3, randomStat(spdBase)); // Vitesse min de 3
    const maxHp = randomHp(species.hp);

    return {
        id: createId(),
        species: species.id,
        name: species.name,
        image: species.image,
        type: species.type,
        rarity: species.rarity,
        level: 1,
        xp: 0,
        xpNeeded: 100,
        hp: maxHp,
        attack: attack,
        defense: defense,
        speed: speed,
        maxHp: maxHp, // Ajout de la stat maxHp
        // Stats de base du monstre (valeurs randomisées)
        baseStats: {
            hp: maxHp,
            attack: attack,
            defense: defense,
            speed: speed
        },
        // Améliorations de stats qui seront gardées
        statBonus: {
            attack: 0,
            defense: 0,
            speed: 0,
            hp: 0
        },
        victories: 0,
        equippedItems: {}
    };
}

// ---- -----------------------------------------------Accès & rendu de chaque écran------------------------------------------------------------------

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
    
    // Utilisation de la nouvelle fonction pour obtenir les stats finales
    const finalStats = getFinalStats(m);
    
    // CORRECTION : S'assurer que les HP actuels ne dépassent jamais les HP max
    if (m.hp > finalStats.hp) {
        m.hp = finalStats.hp;
        saveState(); // Sauvegarder la correction
    }
    
    const hpPct = clamp((m.hp/finalStats.hp)*100,0,100);
    const xpPct = clamp((m.xp/m.xpNeeded)*100,0,100);

    // Générer l'HTML pour les objets équipés
    const equippedItemsHtml = Object.values(m.equippedItems).map(item => `
        <div class="equipped-item rarety-${item.rarity}">
            <img src="${item.image}" alt="${item.name}" class="item-icon">
        </div>
    `).join('');

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
      </div>
    `;
}

function renderCollection() {
  const list = document.getElementById('monster-list');
  list.innerHTML = '';
  state.playerMonsters.forEach(m => {
    const hpPct = clamp((m.hp / m.maxHp) * 100, 0, 100);
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

    div.innerHTML = `
      <img class="monster-img" src="${m.image}" alt="${m.name}">
      <h3>${m.name} <span class="badge ${m.rarity}">${m.rarity.toUpperCase()}</span></h3>
      <div class="statline">Type : ${m.type} — Niveau ${m.level}</div>
      <div class="bar hpbar"><div class="hpfill" style="width:${hpPct}%"></div></div>
      <div class="bar xpbar"><div class="xpfill" style="width:${xpPct}%"></div></div>
      <div class="statline">ATQ ${m.attack} • DEF ${m.defense} • VIT ${m.speed} • PV ${m.hp}/${m.maxHp}</div>
      ${maxFloorHTML} <div class="row">
        <button class="btn" onclick="setActiveMonster('${m.id}')">Activer</button>
        <button class="btn btn-mini" ${sellBtnDisabled} onclick="sellMonster('${m.id}')">${sellBtnText}</button>
      </div>
    `;
    list.appendChild(div);
  });
}



//------------------------------------ Nouvelle fonction utilitaire pour l'affichage du prix---------------------------------------------------
function getMonsterSellPrice(monster) {
  const basePrice = getMonsterBasePrice(monster);
  return Math.floor(basePrice * MONSTER_SELL_RATE);
}
// ===========================================================================================================================================
// ---- ---------------------------------------------------------------Boutique---------------------------------------------------------------
// ===========================================================================================================================================

//---------------------------------------------------- Fonction pour les améliorations--------------------------------------------------------

function buyUpgrade(stat) {
    const m = getActiveMonster();
    if (!m) return showModal('Aucun monstre', 'Veuillez activer un monstre.');
    
    // Calcule la stat actuelle (stats de base + bonus permanents) pour le calcul du coût
    const currentStatValue = m.baseStats[stat] + m.statBonus[stat];
    
    // Le coût est basé sur cette valeur, comme dans votre logique initiale
    const cost = 100 * (currentStatValue + 1);
    
    if (state.gold < cost) {
        return showModal('Pas assez d\'or', `Il vous faut ${cost} 🪙 pour acheter cette amélioration.`);
    }

    state.gold -= cost;
    
    // Ajoute le bonus à la bonne propriété
    m.statBonus[stat] += 1;
    
    showModal('Amélioration', `Votre monstre a gagné +1 en ${stat} !`);
    saveState();
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
        
        // Calcule la stat actuelle (stats de base + bonus permanents)
        const currentStatValue = activeMonster.baseStats[stat] + activeMonster.statBonus[stat];
        
        // Calcule le coût basé sur cette valeur
        const cost = 100 * (currentStatValue + 1);

        // Chaque amélioration est maintenant enveloppée dans une div avec la classe shop-card
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

//------------------------------------------------------ Fonction pour confirmer l'achat d'une amélioration------------------------------------
function confirmUpgradePurchase(stat, quantity) {
    const costPerUpgrade = 100;
    let actualQuantity = quantity;
    
    // Gérer le cas où le joueur veut acheter le maximum
    if (quantity === 'max') {
        actualQuantity = Math.floor(state.gold / costPerUpgrade);
        if (actualQuantity === 0) {
            return showModal('Pas assez d\'or', `Il vous faut au moins ${costPerUpgrade} 🪙 pour acheter une amélioration.`);
        }
    } else {
        actualQuantity = parseInt(quantity, 10);
    }
    
    const totalCost = costPerUpgrade * actualQuantity;

    // Afficher la modale de confirmation
    showModal(
        'Confirmation d\'achat',
        `Voulez-vous acheter ${actualQuantity} améliorations de ${stat} pour ${totalCost} 🪙 ?`,
        () => {
            // Fonction de rappel qui sera exécutée si le joueur confirme l'achat
            buyUpgrade(stat, actualQuantity);
        }
    );
}

// --------------------------------------------------------DEFINITION DU PRIX DE BASE DE OEUF--------------------------------------------------
function getEggCost() {
  return 50 + state.playerMonsters.length * 50;
}

function buyEgg() {
  const eggCost = getEggCost();

  showModal(
    'Confirmation d\'achat',
    `Voulez-vous acheter un œuf mystère pour ${eggCost} or ?`,
    () => { // Ceci est la fonction de rappel
      // Vérifie si le joueur a assez d'or
      if (state.gold < eggCost) {
        showModal('Pas assez d\'or', `Il vous faut au moins ${eggCost} or pour acheter cet œuf mystère.`);
        return;
      }

      // Déduit le coût de l'œuf
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
      saveState();

      // Afficher le message de confirmation et mettre à jour l'affichage
      showModal('Félicitations !', `Vous avez fait éclore un ${newMonster.rarity} ${newMonster.name} !`);
      renderCollection();
      renderMain();
      renderShop();
    }
  );
}

// La fonction renderShop utilise maintenant getEggCost
function renderShop(){
    const eggCost = getEggCost();
    document.getElementById('egg-cost-text').textContent = `${eggCost} or`;

    // Affiche la section des améliorations
    renderUpgradeShop();

    // Affiche la nouvelle section d'objets
    renderItemShop(); 
}

function hatchEgg(rarity){
  const pool = SPECIES[rarity];
  if(!pool || !pool.length) return showModal('Œuf vide', `Aucune espèce définie pour ${rarity}.`);
  const species = choice(pool);
  const mon = createMonsterFromSpecies(species);
  state.playerMonsters.push(mon);
  if(!state.activeMonsterId) state.activeMonsterId = mon.id;
  showModal('Œuf éclos', `Vous obtenez <b>${mon.name}</b> (${mon.type}, ${mon.rarity}) avec des statistiques uniques !`);
}

// -----------------------------------------------ACHAT DES OBJETS et gestion des objets----------------------------------------------------------------------------
function buyItem(itemId) {
  const itemToBuy = ITEMS.find(item => item.id === itemId);
  if (!itemToBuy) {
    console.error('Erreur: objet non trouvé');
    return;
  }
  
  // Afficher un modal de confirmation
  showModal(
    'Confirmation d\'achat',
    `Voulez-vous acheter "${itemToBuy.name}" pour ${itemToBuy.price} 🪙 ?`,
    () => { // Ceci est la fonction de rappel
      // Vérifier si le joueur a assez d'or
      if (state.gold < itemToBuy.price) {
        showModal('Pas assez d\'or', `Il vous faut au moins ${itemToBuy.price} 🪙 pour acheter cet objet.`);
        return;
      }

      // Déduire le coût et ajouter l'objet à l'inventaire du joueur
      state.gold -= itemToBuy.price;
      state.playerItems.push(itemToBuy);
      saveState();

      // Mettre à jour l'affichage et afficher une confirmation
      renderMain();
      showModal('Achat réussi !', `Vous avez acheté ${itemToBuy.name}. Il a été ajouté à votre inventaire !`);
    }
  );
}


function renderItemShop() {
    const itemList = document.getElementById('item-list');
    itemList.innerHTML = ''; // Nettoyer la liste
    
    ITEMS.forEach(item => {
        const itemHtml = `
            <div class="item-card">
                <img src="${item.image}" alt="${item.name}" class="item-image">
                <p>${item.name}</p>
                <p>${item.description}</p>
                <button class="btn" onclick="buyItem('${item.id}')">Acheter (${item.price} 🪙)</button>
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
    }
    
    state.playerItems.forEach((item, index) => {
        const isEquipped = state.playerMonsters.some(m => Object.values(m.equippedItems).includes(item));
        
        // Calcule la valeur de vente de l'objet
        const sellPrice = Math.floor(item.price * 0.25);
        
        const itemCard = document.createElement('div');
        itemCard.className = `card item-card rarety-${item.rarity}`;
        itemCard.innerHTML = `
            <h3>${item.name}</h3>
            <p>${item.description}</p>
            <img src="${item.image}" alt="${item.name}" class="item-image">
            <p>Valeur: ${sellPrice} 🪙</p>
            ${isEquipped ?
                `<button class="btn btn-unequip" onclick="unequipItem('${item.type}')">Déséquiper</button>`
                :
                `<button class="btn btn-equip" onclick="equipItem('${item.id}')">Équiper</button>
                 <button class="btn btn-sell" onclick="sellItem(${index})">Vendre</button>`
            }
        `;
        inventoryGrid.appendChild(itemCard);
    });
    
    if(state.playerItems.length === 0 && Object.keys(state.activeMonsterId && getActiveMonster().equippedItems || {}).length > 0){
        inventoryGrid.innerHTML += `<p>Tous vos objets sont équipés sur vos monstres.</p>`;
    }
}

function sellItem(index) {
    const item = state.playerItems[index];

    if (item) {
        // Calcule le prix de vente en tant que 25% du prix d'achat
        const sellPrice = Math.floor(item.price * 0.25); 
        
        // Ajouter la valeur de vente à l'or du joueur
        state.gold += sellPrice;
        
        // Retirer l'objet de l'inventaire
        state.playerItems.splice(index, 1);
        
        // Mettre à jour l'affichage
        renderInventory();
        renderMain();
        
        // Afficher un message de confirmation
        showModal('Objet vendu !', `Vous avez vendu ${item.name} pour ${sellPrice} 🪙.`);
    }
}

function equipItem(itemId) {
  const itemIndex = state.playerItems.findIndex(item => item.id === itemId);
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
  const existingItem = activeMonster.equippedItems[itemToEquip.type];
  if (existingItem) {
    state.playerItems.push(existingItem);
  }
  activeMonster.equippedItems[itemToEquip.type] = itemToEquip;
  state.playerItems.splice(itemIndex, 1);
  activeMonster.hp = getFinalStats(activeMonster).hp;
  
  saveState();
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
    
    // Mettre à jour les HP actuels après avoir déséquipé les objets
    const finalStats = getFinalStats(activeMonster);
    activeMonster.hp = Math.min(activeMonster.hp, finalStats.hp);

    saveState();
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
        id: Math.random().toString(36).slice(2), // Crée un ID unique pour l'instance
        description: "",
        stats: {} // Ceci est très important pour la fonction applyEquippedItems
    };

    if (itemData.statModifiers) {
        for (const stat in itemData.statModifiers) {
            const min = itemData.statModifiers[stat].min;
            const max = itemData.statModifiers[stat].max;
            // Génère une valeur aléatoire entre min et max
            const bonusValue = Math.random() * (max - min) + min;
            // Crée la description
            const bonusPercent = Math.round(bonusValue * 100);
            newItem.description = `+${bonusPercent}% de ${stat.toUpperCase()}`;
            // Ajoute le bonus calculé à l'objet
            newItem.stats[stat] = bonusValue;
        }
    }
    return newItem;
}

function setActiveMonster(monsterId) {
    // 1. Déséquiper l'ancien monstre actif
    const oldActiveMonster = getActiveMonster();
    if (oldActiveMonster) {
        // Remettre tous les objets équipés dans l'inventaire
        Object.values(oldActiveMonster.equippedItems).forEach(item => {
            state.playerItems.push(item);
        });
        // Vider l'objet des équipements de l'ancien monstre
        oldActiveMonster.equippedItems = {};
        // S'assurer que les PV sont remis à la normale
        
        // CORRECTION : S'assurer que les PV sont remis à la normale, en utilisant getFinalStats
        oldActiveMonster.hp = Math.min(oldActiveMonster.hp, getFinalStats(oldActiveMonster).hp);
    }

    // 2. Définir le nouveau monstre actif
    state.activeMonsterId = monsterId;

    saveState();
    renderMain();
    renderInventory();
    showScreen('main'); // <-- NOUVEAU : on retourne à l'écran principal
}


// --------------------------------------------------------- Achat d'énergies -------------------------------------------------------------------
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
  
  // Cette ligne a été ajoutée pour afficher un message de confirmation
  showModal('Achat d\'énergie', `Vous avez acheté 1 point d'énergie !`);
  
  renderMain();
  saveState();
}

// ===========================================================================================================================================
// -------------------------------------------------- Calcul de statistique------------------------------------------------------------------
// ===========================================================================================================================================

// ----------------------------------------Fonction pour calculer les stats finales (base + bonus)-------------------------------------------
function getFinalStats(m) {
    if (!m) return {};
    return {
        hp: m.baseStats.hp + m.statBonus.hp + (m.equippedItems.hp ? m.equippedItems.hp.bonus : 0),
        attack: m.baseStats.attack + m.statBonus.attack + (m.equippedItems.attack ? m.equippedItems.attack.bonus : 0),
        defense: m.baseStats.defense + m.statBonus.defense + (m.equippedItems.defense ? m.equippedItems.defense.bonus : 0),
        speed: m.baseStats.speed + m.statBonus.speed + (m.equippedItems.speed ? m.equippedItems.speed.bonus : 0),
    };
}

// ------------------------------------------------------ XP & montée de niveau-------------------------------------------------------------
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
        
        // Utilise les statistiques de base aléatoires du monstre
        const baseStats = mon.baseStats;
        
        // CORRECTION : Les bonus de niveau sont maintenant stockés dans statBonus
        mon.statBonus.attack += Math.max(1, Math.floor(baseStats.attack * 0.1));
        mon.statBonus.defense += Math.max(1, Math.floor(baseStats.defense * 0.1));
        mon.statBonus.speed += 1; // La vitesse gagne déjà un minimum de 1
        mon.statBonus.hp += Math.max(1, Math.floor(baseStats.hp * 0.15));
        
        // CORRECTION : Met à jour les HP et maxHP correctement après la montée de niveau
        const finalStats = getFinalStats(mon);
        mon.hp = finalStats.hp; // Remet les HP au maximum après montée de niveau
        mon.maxHp = finalStats.hp; // Met à jour maxHP
        
        mon.xpNeeded = xpNeeded(mon.level);
        showModal('Niveau supérieur', `${mon.name} passe <b>niveau ${mon.level}</b> !`);
    }
    renderMain();
}

// ===========================================================ZONE DE TOUR ET COMBAT===========================================================
// ------------------------------------------------ Activation de la tour et des combats-----------------------------------------------------------------

// -------------------------------------------------------- Tour & génération d'ennemis-------------------------------------------------------

function pickEnemySpecies(floor){
  // Si l'étage est un multiple de 25, on choisit une espèce de boss.
  if(floor > 0 && floor % 50 === 0){
    return choice(BOSS_SPECIES);
  }

  // Sinon, la logique normale de sélection s'applique.
  const roll = Math.random();
  if(floor > 15 && roll < 0.15) return choice(SPECIES.epic);
  if(floor > 5  && roll < 0.35) return choice(SPECIES.rare);
  return choice(SPECIES.common);
}


function scaleEnemyFromSpecies(species, floor){
  const foe = createMonsterFromSpecies(species);
  
  // NOUVEAU : On ajoute une propriété "isBoss" pour savoir si c'est un boss
  foe.isBoss = BOSS_SPECIES.some(boss => boss.name === foe.name);

  // Calcule le niveau en fonction de l'étage, comme avant
  foe.level = Math.max(1, Math.floor(floor / 2));
  
  // **CORRECTION : Simule la montée de niveau pour que les ennemis gagnent des stats comme le joueur.**
  for (let i = 1; i < foe.level; i++) {
    foe.statBonus.attack += Math.max(1, Math.floor(foe.baseStats.attack * 0.1));
    foe.statBonus.defense += Math.max(1, Math.floor(foe.baseStats.defense * 0.1));
    foe.statBonus.speed += 1;
    foe.statBonus.hp += Math.max(1, Math.floor(foe.baseStats.hp * 0.15));
  }
  
  // NOUVEAU : Bonus de stats pour les boss
  if(foe.isBoss){
    foe.statBonus.hp = Math.floor(foe.statBonus.hp * 1.2);
    foe.statBonus.attack = Math.floor(foe.statBonus.attack * 1.2);
    foe.statBonus.defense = Math.floor(foe.statBonus.defense * 1.2);
    foe.statBonus.speed = Math.floor(foe.statBonus.speed * 1.1);
  }
  
  // Met à jour les stats finales avec la nouvelle fonction
  const finalStats = getFinalStats(foe);
  foe.hp = finalStats.hp;
  foe.maxHp = finalStats.hp;
  foe.attack = finalStats.attack;
  foe.defense = finalStats.defense;
  foe.speed = finalStats.speed;

  return foe;
}

// ---- ---------------------------------------------------Combat (tours + ATB bonus)---------------------------------------------------------
function startTowerRun(){
  if(state.energy <= 0) return showModal('Énergie insuffisante','Vous n\'avez plus d\'énergie.');
  const m = getActiveMonster(); if(!m) return showModal('Aucun monstre','Activez un monstre.');
  
  // NOUVELLE LIGNE : On initialise l'étage max si la propriété n'existe pas encore
  if (m.maxFloor === undefined) {
    m.maxFloor = 0;
  }
  
  state.energy -= 1;
  // CORRECTION : Utilise getFinalStats pour initialiser la vie du monstre.
  // Cela garantit que tous les bonus d'objets sont inclus une seule fois, au début de la run.
  m.hp = getFinalStats(m).hp;
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
      // --- NOUVELLE LOGIQUE : Mettre à jour les objectifs
      state.dailyObjectives.forEach(obj => {
          if (obj.type === 'battles') {
              obj.current += 1;
          }
          if (obj.type === 'floor' && state.currentFloor >= obj.value) {
              obj.current = obj.value;
          }
      });
      
      // Ajoutez ici la logique pour incrémenter les victoires et vérifier l'évolution
      // La fonction checkEvolution ne fera qu'ajouter la propriété `evolutionPending`
      monster.victories = (monster.victories || 0) + 1;
      checkEvolution(monster);

      // --- NOUVELLE LOGIQUE : Mettre à jour l'étage max
      if (state.currentFloor > monster.maxFloor) {
          monster.maxFloor = state.currentFloor;
      }

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
      // Le combat suivant est lancé ici
      runNextFloor(monster); 

    } else { // Ceci est le bloc qui gère la défaite
      // Vérifie si le monstre peut évoluer après une défaite
      if (monster.evolutionPending) {
          // Si les conditions sont réunies, on déclenche l'évolution et on ne fait rien d'autre
          evolveMonster(monster, monster.evolvesTo);
          return;
      }

      // Si pas d'évolution, le jeu se termine normalement
      const bonusHp = monster.equippedItems.hp ? monster.equippedItems.hp.bonus : 0;
      monster.hp = monster.maxHp + bonusHp;
      state.currentFloor = 1;
      document.getElementById('backToMain').disabled = false;
      showModal('Fin de la run', `${monster.name} a été vaincu. Retour au menu.`);
      showScreen('main');
    }
  });
}

// ---------------------------------------------------------- Combat en lui même---------------------------------------------------------------

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
  // state.battle.speedIndex = 0; // <-- Cette ligne réinitialise la vitesse
  updateSpeedBtn();

  function renderBattle(){
    // Utilisation de la nouvelle fonction pour obtenir les stats finales du joueur
    const finalPlayerStats = getFinalStats(player);
    const finalEnemyStats = getFinalStats(enemy); // J'ai ajouté ce calcul pour l'ennemi aussi
    
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

  // Dégâts avec affinités
  
  function dealDamage(attacker, defender, source){
      // Utilisation des statistiques finales pour le calcul des dégâts
      const attackerFinalStats = getFinalStats(attacker);
      const defenderFinalStats = getFinalStats(defender);

      const base = Math.max(1, attackerFinalStats.attack - defenderFinalStats.defense);
      const mult = typeMultiplier(attacker.type, defender.type);
      const dmg = Math.max(1, Math.floor(base * mult));
      
      // Appliquer les dégâts
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
      // Prochain tour après un délai dépendant de la vitesse (générale)
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

// -------------------------------Fonction appelée à la fin d'un combat (récupère le résultat 'win' ou 'lose')--------------------------------

function onEnd(result) {
    const activeMonster = getActiveMonster();

    // Mettre à jour les HP du monstre du joueur avec les HP restants de la bataille
    if (state.battle && state.battle.player && activeMonster) {
        activeMonster.hp = state.battle.player.hp;
    }
    
    // Si le joueur a perdu
    if (result === 'lose') {
        if (activeMonster.evolutionPending) {
            evolveMonster(activeMonster, activeMonster.evolvesTo);
            return;
        }

        const finalStats = getFinalStats(activeMonster);
        activeMonster.hp = finalStats.hp;
        activeMonster.maxHp = finalStats.hp;
        
        state.currentFloor = 1;
        document.getElementById('backToMain').disabled = false;
        showModal('Fin de la run', `${activeMonster.name} a été vaincu. Retour au menu.`);
        showScreen('main');
    }

    // Si la bataille est gagnée
    if (result === 'win') {
        const xpGain = state.battle.enemy.xpValue;
        activeMonster.xp += xpGain;
        logLine(`${activeMonster.name} gagne ${xpGain} XP !`);
        
        // Logique de montée de niveau
        if (activeMonster.xp >= activeMonster.xpNeeded) {
            activeMonster.level++;
            activeMonster.xp = 0;
            activeMonster.xpNeeded = xpNeeded(activeMonster.level);
            
            // Met à jour les stats de base (sans bonus)
            activeMonster.baseStats.hp += 2;
            activeMonster.baseStats.attack += 1;
            activeMonster.baseStats.defense += 1;
            activeMonster.baseStats.speed += 1;

            // CORRECTIF : Met à jour les PV actuels et les PV max avec les nouvelles stats de base
            const newStats = getFinalStats(activeMonster);
            activeMonster.hp = newStats.hp;
            activeMonster.maxHp = newStats.hp;
            
            showModal('Montée de niveau !', `${activeMonster.name} a atteint le niveau ${activeMonster.level} !`);
        }
        
        // Incrémente le compteur de victoires et vérifie les conditions d'évolution
        activeMonster.victories = (activeMonster.victories || 0) + 1;
        checkEvolution(activeMonster);
    }
    
    // Nettoyer l'état de la bataille
    state.battle.running = false;
    
    // Mettre à jour l'affichage
    renderMain();
    saveState();
}

// ---------------------------------------Appel du bouton et reglage du bouton VITESSE de combat-------------------------------------------------

function toggleBattleSpeed(){
  state.battle.speedIndex = (state.battle.speedIndex + 1) % SPEED_STEPS.length;
  updateSpeedBtn();
}
function updateSpeedBtn(){
  const btn = document.getElementById('speedBtn');
  if(btn) btn.textContent = `⚡ Vitesse x${SPEED_STEPS[state.battle.speedIndex]}`;
}

// ===========================================================================================================================================
// -------------------------------------------------------Systeme de recupération d'énergie----------------------------------------------------

// ---- Énergie : régénération
function startEnergyRegen(){
  if(state.energyTimer) clearInterval(state.energyTimer);
  state.energyTimer = setInterval(()=>{
    if(state.energy < ENERGY_MAX){
      state.energy += 1;
      renderMain();
    }
  }, ENERGY_REGEN_MS);
}


// ---------------------------------------------------------------- Vendre un monstre---------------------------------------------------------

function sellMonster(monsterId) {
  // Trouver le monstre dans la collection
  const monsterIndex = state.playerMonsters.findIndex(m => m.id === monsterId);
  const monster = state.playerMonsters[monsterIndex];

  // Vérifier si le monstre existe et n'est pas le monstre actif
  if (!monster || state.activeMonsterId === monster.id) {
    showModal("Vous ne pouvez pas vendre votre monstre actif !");
    return;
  }
  
  const basePrice = getMonsterBasePrice(monster);
  const sellPrice = Math.floor(basePrice * MONSTER_SELL_RATE);
  
  // Utiliser window.confirm() pour demander la confirmation
  const confirmation = window.confirm(`Voulez-vous vraiment vendre ${monster.name} pour ${sellPrice} or ?`);
  
  // Si l'utilisateur clique sur "OK" (oui), continuer la vente
  if (confirmation) {
    // Ajouter l'or au joueur
    state.gold += sellPrice;
    
    // Supprimer le monstre de la collection
    state.playerMonsters.splice(monsterIndex, 1);
    
    // !-- Étape cruciale : Sauvegarder l'état après la modification !
    saveState();

    // Mettre à jour l'affichage
    renderMain();
    renderCollection(); 
    
    // Afficher un message de confirmation
    showModal(`${monster.name} a été vendu pour ${sellPrice} or.`);
  } 
  // Si l'utilisateur clique sur "Annuler" (non), le code ne fait rien et le monstre reste.
}

// ----------------------------------------------Fonction utilitaire pour calculer le prix de base d'un monstre----------------------------------

// Le prix augmente avec le nombre de monstres déjà obtenus.
function getMonsterBasePrice(monster) {
  const eggCost = getEggCost(); // On utilise la même fonction pour la vente
  let rarityMultiplier = 1;
  switch (monster.rarity) {
    case 'common': rarityMultiplier = 0.25; break;
    case 'rare': rarityMultiplier = 0.5; break;
    case 'epic': rarityMultiplier = 1.2; break;
    default: rarityMultiplier = 0.25;
  }
  return Math.floor(eggCost * rarityMultiplier);
}

//----------------------------- CODE SERVANT A LA MISE EN PLACE DU TRI DES PETIS MONSTRES DANS LA COLLECTION------------------------------------

function sortMonsters(criteria) {
  state.playerMonsters.sort((a, b) => {
    switch (criteria) {
      case 'level':
        // Trie du niveau le plus haut au plus bas
        return b.level - a.level;
      case 'rarity':
        // Trie par rareté (Épique > Rare > Commun)
        const rarityOrder = { epic: 3, rare: 2, common: 1 };
        return rarityOrder[b.rarity] - rarityOrder[a.rarity];
      case 'type':
        // Trie par type (ordre alphabétique)
        if (a.type < b.type) return -1;
        if (a.type > b.type) return 1;
        return 0;
      case 'name':
        // Trie par nom (ordre alphabétique)
        if (a.name < b.name) return -1;
        if (a.name > b.name) return 1;
        return 0;
      default:
        // Trie par défaut par niveau si le critère est inconnu
        return b.level - a.level;
    }
  });
  renderCollection();
}
// 
// 
// ----------------------------------------------------------PROCESSUS D EVOLUTION------------------- ----------------------------------------

// Trouve les données d'une espèce de monstre par son ID
function getSpeciesDataById(speciesId) {
    // Recherche dans la base de données des espèces évoluées en premier
    if (EVOLVED_SPECIES[speciesId]) {
        return EVOLVED_SPECIES[speciesId];
    }
    // Si l'espèce n'est pas évoluée, on la cherche dans les listes de SPECIES
    for (const rarity in SPECIES) {
        const found = SPECIES[rarity].find(s => s.id === speciesId);
        if (found) {
            return found;
        }
    }
    return null; // Retourne null si aucune espèce n'est trouvée
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
    
    // Si toutes les conditions sont remplies, on marque l'évolution comme en attente
    if (allConditionsMet) {
        monster.evolutionPending = true;
        monster.evolvesTo = evolutionInfo.evolvesTo;
    }
}

// Effectue le processus d'évolution
function evolveMonster(monster, newSpeciesId) {
    const oldBaseStatsPlusBonus = {
        hp: monster.baseStats.hp + monster.statBonus.hp,
        attack: monster.baseStats.attack + monster.statBonus.attack,
        defense: monster.baseStats.defense + monster.statBonus.defense,
        speed: monster.baseStats.speed + monster.statBonus.speed
    };
    
    // On garde le ratio de vie de l'ancien monstre sans les objets
    const oldHpRatio = monster.hp / oldBaseStatsPlusBonus.hp;

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

        // **CORRECTION : Met à jour la propriété maxHp**
        monster.maxHp = newSpeciesData.hp + monster.statBonus.hp;
        
        // Récupère les stats finales (base + bonus permanents)
        const newFinalStats = getFinalStats(monster);
        
        // La solution : met la vie au maximum
        monster.hp = newFinalStats.hp;

        monster.victories = 0;

        evolutionImage.src = monster.image;
        evolutionImage.classList.remove('evolve-animation');

        document.getElementById('evolution-message').textContent = `${oldName} a évolué en ${newSpeciesData.name} !`;

        document.getElementById('backToMainFromEvolution').onclick = () => {
            showScreen('main');
            renderMain();
        };

        saveState();
        renderMain();
    }, 4000); 
}

// Génère un ID unique pour chaque monstre
function createId() {
    return 'id-' + Date.now() + '-' + Math.random().toString(36).substr(2, 9);
}



// ------------------------------------- --------------------OBJECTIFS JOURNALIERS----------------------------------------------------------

// Fonction pour choisir aléatoirement des objectifs uniques
function generateDailyObjectives() {
    const objectivesToGenerate = 3; // On peut en générer 3 par jour
    const selectedObjectives = [];
    const availableObjectives = [...DAILY_OBJECTIVES]; // Copie pour éviter de modifier l'original

    for (let i = 0; i < objectivesToGenerate; i++) {
        if (availableObjectives.length === 0) break;
        const randomIndex = Math.floor(Math.random() * availableObjectives.length);
        const objective = availableObjectives.splice(randomIndex, 1)[0];
        
        // On s'assure que l'objectif n'est pas déjà dans la liste
        selectedObjectives.push(objective);
    }
    
    // On copie la structure de l'objectif pour ne pas modifier l'original
    state.dailyObjectives = selectedObjectives.map(obj => ({
        ...obj,
        current: 0 // Le progrès de l'objectif est à 0 au début de la journée
    }));
    
    // On met à jour l'horodatage
    state.lastObjectiveReset = new Date().toDateString();
    
    // On sauvegarde l'état du jeu pour que les objectifs soient conservés
    saveState();
}


// -------------------------------------------------Affiche l'écran des objectifs quotidiens-------------------------------------------------
function renderObjectives() {
    let html = '<h2>Objectifs du jour</h2>';
    state.dailyObjectives.forEach(obj => {
        const isCompleted = obj.current >= obj.value;
        const progress = isCompleted ? 'Completé !' : `${obj.current}/${obj.value}`;
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
    
    // Ajoutez le bouton de retour à la fin du code HTML généré
    html += `<button class="btn" onclick="showScreen('main')">Retour</button>`;

    document.getElementById('objectives-screen').innerHTML = html;
}

// Fonction pour réclamer un objectif
function claimObjective(id) {
    const obj = state.dailyObjectives.find(o => o.id === id);
    if (!obj || obj.current < obj.value) {
        return; // L'objectif n'est pas encore complété
    }
    
    state.gold += obj.reward;
    showModal('Récompense !', `Vous avez gagné ${obj.reward} or pour avoir complété l'objectif !`);
    
    // On retire l'objectif du tableau pour qu'il ne puisse pas être réclamé de nouveau
    state.dailyObjectives = state.dailyObjectives.filter(o => o.id !== id);
    
    saveState();
    renderObjectives();
}

// --------------------------------------------------INITIALISATION DU JEU-------------------------------------------------------------------------------

// Fonction d'initialisation du jeu
function init() {
    const hasSavedGame = localStorage.getItem('monsterBreederState_slot1') !== null;

    if (hasSavedGame) {
        loadState(1); 
        // Réinitialise les objectifs si une nouvelle journée a commencé
        if (state.lastObjectiveReset !== new Date().toDateString()) {
            generateDailyObjectives();
        }
        showModal('Partie chargée', 'La sauvegarde 1 a été chargée !');
    } else {
        startNewGame();
    }

    // Affiche l'écran principal ou l'écran de départ si c'est une nouvelle partie
    if (state.playerMonsters && state.playerMonsters.length > 0) {
        showScreen('main');
    } else {
        showScreen('home');
    }
}



// ---- Initialisation : donner 1 monstre commun gratuit si vide
function bootstrap() {
  // On lance la boucle de mise à jour de l'énergie
  startEnergyRegen();

  // On affiche l'écran d'accueil
  showScreen('home');
  
  // On vérifie s'il y a une sauvegarde pour afficher le bouton 'Continuer'
  checkSavedGameAndShowButton();
}

// =============================================== PARTIE SAUVEGARDE ET CHARGEMENT=========================================================

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
function saveState(slotId) {
  localStorage.setItem(`monsterBreederState_slot${slotId}`, JSON.stringify(state));
}

// Fonction pour charger l'état du jeu à partir d'un emplacement spécifique
function loadState(slotId) {
  const savedState = localStorage.getItem(`monsterBreederState_slot${slotId}`);
  if (savedState) {
    state = JSON.parse(savedState);
    if (!state.dailyObjectives) {
        state.dailyObjectives = [];
    }
    showModal('Partie chargée', `La sauvegarde ${slotId} a été chargée avec succès !`);
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
  
  // Crée les boutons pour chaque emplacement de sauvegarde
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
  closeModal(); // Ferme la modale avant de charger
  loadState(slot);
  if (state.lastObjectiveReset !== new Date().toDateString()) {
    generateDailyObjectives();
    showModal('Nouveaux objectifs !', 'De nouveaux objectifs quotidiens sont disponibles !');
  }
  showScreen('main'); // Va sur l'écran principal après le chargement
  toggleMusic();
  document.getElementById('game-music').volume = 0.5;
}

function resetAndReload(slot) {
  resetState(slot);
  showSaveLoadModal(); // Affiche à nouveau la modale pour voir le changement
}


// -------------------------------------------------DEBUT DE NOUVELLE PARTIE ET SES DATABASE------------------------------------------


// Fonction pour lancer une nouvelle partie
// Fonction pour lancer une nouvelle partie
function startNewGame() {
  // Réinitialise l'état du jeu pour une nouvelle partie
  state = {
    gold: 111150,
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
    dailyObjectives: [], // Tableau pour les objectifs du jour
    lastObjectiveReset: null, // Horodatage de la dernière réinitialisation 
  };
  
  // Donne un monstre de départ
  const sp = choice(SPECIES.common);
  const mon = createMonsterFromSpecies(sp);
  state.playerMonsters.push(mon);
  state.activeMonsterId = mon.id;
  generateDailyObjectives();
  saveState(1); // Sauvegarde la nouvelle partie dans l'emplacement 1
  
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


// ---------------------------------------------- GESTION DE LA MUSIQUE---------------------------------------------------------------


// Fonction pour gérer la musique du jeu
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