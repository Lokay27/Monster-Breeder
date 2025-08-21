// =======================
// Monster Breeder - Core
// =======================

// ---- Constantes & réglages
const ENERGY_MAX = 50;
const ENERGY_REGEN_MS = 60000; // +1 énergie par minute
const GOLD_PER_RARITY = {
    'common': 10,
    'uncommon': 25,
    'rare': 50,
    'epic': 100
};

const SPEED_STEPS = [1, 2, 4]; // x1/x2/x4
const ATB_TICK_MS = 200; // tick base
const ATB_FILL_BASE = 3; // multiplicateur de remplissage par point de vitesse
const ATB_FULL = 100;
const MONSTER_SELL_RATE = 0.25; // Vente pour 25% de la valeur de base
// const EGG_COST = 20; // Coût unique pour l'œuf mystère
const EGG_PROBABILITIES = {
  common: 0.70, // 70% de chance d'avoir un monstre commun
  rare: 0.25,   // 25% de chance d'avoir un monstre rare
  epic: 0.05    // 5% de chance d'avoir un monstre épique
};

const TYPE_ADV = { // avantage simple
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

// ---- Base d'espèces (fixes)
// Commun (reprend tes données)
const SPECIES = {
  common: [
    // Eau
    { name: 'Gouttelette', type: 'eau', rarity:'common', attack: 12, defense: 8, hp: 20, image: "image/Eau/gouttelette.png" },
    { name: 'Nageur', type: 'eau', rarity:'common', attack: 14, defense: 6, hp: 20, image: "image/Eau/nageur.png"  },
    { name: 'Blob de Mer', type: 'eau', rarity:'common', attack: 11, defense: 9, hp: 20, image: "image/Eau/blobdemer.png" },
    { name: 'Vague Junior', type: 'eau', rarity:'common', attack: 13, defense: 7, hp: 20, image: "image/Eau/vaguejunior.png" },
    { name: 'Bullot', type: 'eau', rarity:'common', attack: 10, defense: 10, hp: 20, image: "image/Eau/bullot.png" },
    { name: 'Hydranon', type: 'eau', rarity:'common', attack: 15, defense: 5, hp: 20, image: "image/Eau/hydranon.png" },
    
    // Feu
    { name: 'Embraseur', type: 'feu', rarity:'common', attack: 15, defense: 5, hp: 20, image: "image/Feu/embraseur.png" },
    { name: 'Braizon', type: 'feu', rarity:'common', attack: 13, defense: 7, hp: 20, image: "image/Feu/braizon.png" },
    { name: 'Pyron', type: 'feu', rarity:'common', attack: 16, defense: 4, hp: 20, image: "image/Feu/pyron.png" },
    { name: 'Flambino', type: 'feu', rarity:'common', attack: 14, defense: 6, hp: 20, image: "image/Feu/Flambino.png" },
    { name: 'Cendrillon', type: 'feu', rarity:'common', attack: 12, defense: 8, hp: 20, image: "image/Feu/cendrillon.png" },
    { name: 'Incendium', type: 'feu', rarity:'common', attack: 17, defense: 3, hp: 20, image: "image/Feu/incendium.png"},
    
    // Plante
    { name: 'Florin', type: 'plante', rarity:'common', attack: 10, defense: 10, hp: 20, image: "image/Plante/Florin.png" },
    { name: 'Racinelet', type: 'plante', rarity:'common', attack: 9, defense: 11, hp: 20, image: "image/Plante/racinelet.png" },
    { name: 'Mousseur', type: 'plante', rarity:'common', attack: 11, defense: 9, hp: 20, image: "image/Plante/mousseur.png" },
    { name: 'Fleurie', type: 'plante', rarity:'common', attack: 12, defense: 8, hp: 20, image: "image/Plante/Fleurie.png" },
    { name: 'Champi', type: 'plante', rarity:'common', attack: 8, defense: 12, hp: 20, image: "image/Plante/champi.png" },
    { name: 'Sylvanos', type: 'plante', rarity:'common', attack: 10, defense: 10, hp: 20, image: "image/Plante/sylvanos.png"},
    
    // Terre
    { name: 'Caillou', type: 'terre', rarity:'common', attack: 10, defense: 12, hp: 20, image: "image/Terre/caillou.png" },
    { name: 'Rochelle', type: 'terre', rarity:'common', attack: 9, defense: 13, hp: 20, image:  "image/Terre/rochelle.png" },
    { name: 'Minéralien', type: 'terre', rarity:'common', attack: 11, defense: 11, hp: 20, image:  "image/Terre/minéralien.png" },
    { name: 'Galette', type: 'terre', rarity:'common', attack: 12, defense: 10, hp: 20, image:  "image/Terre/galette.png" },
    { name: 'Pebble', type: 'terre', rarity:'common', attack: 13, defense: 9, hp: 20, image:  "image/Terre/pebble.png" },
    { name: 'Géodon', type: 'terre', rarity:'common', attack: 10, defense: 12, hp: 20, image:  "image/Terre/géodon.png" }
  ],
  // Rare (3-4 par type)
  rare: [
    { name: 'Ondin', type: 'eau', rarity:'rare', attack: 16, defense: 12, hp: 22, image: "image/Eau/ondin.png" },
    { name: 'Siréna', type: 'eau', rarity:'rare', attack: 17, defense: 11, hp: 22, image: "image/Eau/sirena.png" },
    { name: 'Marinelle', type: 'eau', rarity:'rare', attack: 18, defense: 10, hp: 22, image: "image/Eau/marinelle.png" },

    { name: 'Salamandre', type: 'feu', rarity:'rare', attack: 17, defense: 12, hp: 22, image: "image/Feu/salamandre.png" },
    { name: 'Feuret', type: 'feu', rarity:'rare', attack: 18, defense: 10, hp: 22, image: "image/Feu/feuret.png" },
    { name: 'Magmeling', type: 'feu', rarity:'rare', attack: 19, defense: 10, hp: 22, image: "image/Feu/magmeling.png" },

    { name: 'Dryade', type: 'plante', rarity:'rare', attack: 15, defense: 13, hp: 22, image: "image/Plante/dryade.png" },
    { name: 'Squirel', type: 'plante', rarity:'rare', attack: 14, defense: 14, hp: 22, image: "image/Plante/squirel.png" },
    { name: 'Roncebarbe', type: 'plante', rarity:'rare', attack: 16, defense: 12, hp: 22, image: "image/Plante/roncebarbe.png" },

    { name: 'Golem', type: 'terre', rarity:'rare', attack: 15, defense: 14, hp: 22, image: "image/Terre/golem.png" },
    { name: 'Bouldard', type: 'terre', rarity:'rare', attack: 17, defense: 13, hp: 22, image: "image/Terre/bouldard.png" },
    { name: 'Terramite', type: 'terre', rarity:'rare', attack: 14, defense: 15, hp: 22, image: "image/Terre/terramite.png" }
  ],
  // Épique (2-3 par type)
  epic: [
    { name: 'Kraken', type: 'eau', rarity:'epic', attack: 20, defense: 18, hp: 25, image: "image/Eau/kraken.png" },
    { name: 'Léviathan', type: 'eau', rarity:'epic', attack: 18, defense: 20, hp: 25, image: "image/Eau/leviathan.png" },

    { name: 'Dragon de Lave', type: 'feu', rarity:'epic', attack: 21, defense: 16, hp:25, image: "image/Feu/dragondelave.png" },
    { name: 'Phénix', type: 'feu', rarity:'epic', attack: 22, defense: 15, hp: 25, image: "image/Feu/phenix.png" },

    { name: 'Dracofeuille', type: 'plante', rarity:'epic', attack: 20, defense: 20, hp: 25, image: "image/Plante/dracofeuille.png" },
    { name: 'Ent Ancien', type: 'plante', rarity:'epic', attack: 18, defense: 23, hp: 25, image: "image/Plante/entancien.png" },

    { name: 'Titan de Pierre', type: 'terre', rarity:'epic', attack: 23, defense: 19, hp: 25, image: "image/Terre/titandepierre.png" },
    { name: 'Colosse', type: 'terre', rarity:'epic', attack: 20, defense: 20, hp: 25, image: "image/Terre/colosse.png" }
  ]
};

const BOSS_SPECIES = [
  { name: 'Dracozor', type: 'feu', rarity: 'epic',  hp: 25, attack: 28, defense: 26, speed: 10 , image: 'image/boss/dracozor.png' },
  { name: 'Hydranox', type: 'eau', rarity: 'epic',  hp: 25, attack: 26, defense: 28, speed: 10 , image: 'image/boss/hydranox.png' },
  { name: 'Gravelor', type: 'terre', rarity: 'epic',  hp: 25, attack: 27, defense: 27, speed: 10 , image: 'image/boss/gravelor.png' },
  { name: 'Broceliox', type: 'plante', rarity: 'epic',  hp: 25, attack: 26, defense: 28, speed: 10 , image: 'image/boss/broceliox.png'},
  // Ajoutez d'autres boss ici
];

const BOSS_FLOORS = [25, 50, 75, 100, 125, 150];


// ITEMS DANS LA BOUTIQUE
const ITEMS = [
  { id: '1', name: 'Épée de Bois', type: 'attack', rarity: 'common', price: 100, bonus: 2, image: 'image/items/epéedebois.png', description: '+2 ATQ' },
  { id: '7', name: 'Épée de Fer', type: 'attack', rarity: 'rare', price: 500, bonus: 4, image: 'image/items/epéedefer.png', description: '+4 ATQ' },
  { id: '8', name: 'Épée de Diamant', type: 'attack', rarity: 'epic', price: 1500, bonus: 8, image: 'image/items/epéedediamant.png', description: '+8 ATQ' },
  { id: '2', name: 'Bouclier en Bois', type: 'defense', rarity: 'common', price: 100, bonus: 2, image: 'image/items/bouclierdebois.png', description: '+2 DEF' },
  { id: '9', name: 'Armure en fer', type: 'defense', rarity: 'rare', price: 500, bonus: 4, image: 'image/items/armureenfer.png', description: '+4 DEF' },
  { id: '10', name: 'Talisman défensif', type: 'defense', rarity: 'epic', price: 1500, bonus: 8, image: 'image/items/talismandef.png', description: '+8 DEF' },
  { id: '3', name: 'Poudre de vitesse commun', type: 'speed', rarity: 'rare', price: 300, bonus: 1, image: 'image/items/poudrevitesse1.png', description: '+1 VIT' },
  { id: '4', name: 'Potion de Vie', type: 'hp', rarity: 'common', price: 100, bonus: 5, image: 'image/items/potionvie1.png', description: '+5 PV' },
  { id: '5', name: 'Potion de Vie', type: 'hp', rarity: 'rare', price: 500, bonus: 10, image: 'image/items/potionvie2.png', description: '+10 PV' },
  { id: '6', name: 'Potion de Vie', type: 'hp', rarity: 'epic', price: 1500, bonus: 20, image: 'image/items/potionvie3.png', description: '+20 PV' },
];

// ITEMS DE VICTOIRE DE BOSS
const BOSS_LOOT_TABLE = [
    // Exemple : l'Amulette Ancienne
    {id: 'ancient_amulet', name: 'Amulette Ancienne', type: 'speed', bonus: 3, cost: 5000, rarity: 'legendary', image: 'image/items/amuletteancienne.png', description: '+3 VIT'},
    {id: 'legendary_sword',name: 'Épée Légendaire',type: 'attack',bonus: 15,cost: 10000,rarity: 'legendary',image: 'image/items/épéelégendaire.png', description: '+15 ATQ'}
];

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
  playerItems: []
};

// ---- Helpers
function rand(min,max){ return Math.floor(Math.random()*(max-min+1))+min; }
function choice(arr){ return arr[rand(0,arr.length-1)]; }
function clamp(v,min,max){ return Math.max(min, Math.min(max, v)); }
function xpNeeded(level) {
    return Math.floor(100 * (level ** 1.5));
}

// ---- UI helpers
function showScreen(id){
  document.querySelectorAll('.screen').forEach(s=>s.classList.add('hidden'));
  document.getElementById(id+'-screen').classList.remove('hidden');
  if(id==='main') renderMain();
  if(id==='collection') renderCollection();
  if(id==='shop') renderShop();
  if(id==='inventory') renderInventory();
}
let modalCallback = null;

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



function getSpecies(monsterName) {
  for (const rarity in SPECIES) {
    const found = SPECIES[rarity].find(species => species.name === monsterName);
    if (found) {
      return found;
    }
  }
  return null;
}

// ---- Création d'un monstre depuis une espèce fixe avec variabilité
function createMonsterFromSpecies(species){
  const spdBase = species.rarity==='epic' ? 8 : species.rarity==='rare' ? 6 : 5;
  
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
    id: Math.random().toString(36).slice(2),
    name: species.name,
    type: species.type,
    rarity: species.rarity,
    image: species.image,
    level: 1,
    attack: attack,
    defense: defense,
    speed: speed,
    maxHp: maxHp,
    hp: maxHp,
    xp: 0,
    xpNeeded: xpNeeded(1),
    equippedItems: {}
  };
}

// ---- Accès & rendu
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
  
  // Calcul des statistiques totales avec les bonus d'objets
  const bonusAttack = m.equippedItems.attack ? m.equippedItems.attack.bonus : 0;
  const bonusDefense = m.equippedItems.defense ? m.equippedItems.defense.bonus : 0;
  const bonusSpeed = m.equippedItems.speed ? m.equippedItems.speed.bonus : 0;
  const bonusHp = m.equippedItems.hp ? m.equippedItems.hp.bonus : 0;

  const totalAttack = m.attack + bonusAttack;
  const totalDefense = m.defense + bonusDefense;
  const totalSpeed = m.speed + bonusSpeed;
  const totalMaxHp = m.maxHp + bonusHp;
  
  const hpPct = clamp((m.hp/totalMaxHp)*100,0,100);
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
        <div class="statline">ATQ ${totalAttack}</div>
        <div class="statline">DEF ${totalDefense}</div>
        <div class="statline">VIT ${totalSpeed}</div>
        <div class="statline">PV ${m.hp}/${totalMaxHp}</div>
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



// Nouvelle fonction utilitaire pour l'affichage du prix
function getMonsterSellPrice(monster) {
  const basePrice = getMonsterBasePrice(monster);
  return Math.floor(basePrice * MONSTER_SELL_RATE);
}

// ---- Boutique
function buyUpgrade(stat, quantity) {
    const m = getActiveMonster();
    if (!m) return showModal('Aucun monstre', 'Veuillez activer un monstre.');
    
    const costPerUpgrade = 100;
    const totalCost = costPerUpgrade * quantity;

    if (state.gold < totalCost) {
        // Cette vérification est déjà faite dans la modale, mais on la garde en sécurité
        return showModal('Pas assez d\'or', `Il vous faut ${totalCost} 🪙 pour acheter ces améliorations.`);
    }

    state.gold -= totalCost;
    
    switch (stat) {
        case 'attack':
            m.attack += quantity;
            break;
        case 'defense':
            m.defense += quantity;
            break;
        case 'speed':
            m.speed += quantity;
            break;
    }
    
    showModal('Amélioration', `Votre monstre a gagné +${quantity} en ${stat} !`);
    
    saveState();
    renderMain();
    renderShop();
}

// Fonction pour générer le HTML des améliorations
function renderUpgradeShop() {
    const container = document.getElementById('upgrades-container');
    const costPerUpgrade = 100;
    
    // Le HTML est généré ici et non dans le fichier HTML
    container.innerHTML = `
        <div class="upgrade-row">
            <p>Amélioration d'ATQ</p>
            <div class="upgrade-buttons">
                <button class="btn btn-mini" onclick="confirmUpgradePurchase('attack', 1)">+1 (${costPerUpgrade} 🪙)</button>
                <button class="btn btn-mini" onclick="confirmUpgradePurchase('attack', 10)">+10 (${costPerUpgrade * 10} 🪙)</button>
                <button class="btn btn-max" onclick="confirmUpgradePurchase('attack', 'max')">MAX</button>
            </div>
        </div>
        <div class="upgrade-row">
            <p>Amélioration de DEF</p>
            <div class="upgrade-buttons">
                <button class="btn btn-mini" onclick="confirmUpgradePurchase('defense', 1)">+1 (${costPerUpgrade} 🪙)</button>
                <button class="btn btn-mini" onclick="confirmUpgradePurchase('defense', 10)">+10 (${costPerUpgrade * 10} 🪙)</button>
                <button class="btn btn-max" onclick="confirmUpgradePurchase('defense', 'max')">MAX</button>
            </div>
        </div>
        <div class="upgrade-row">
            <p>Amélioration de VIT</p>
            <div class="upgrade-buttons">
                <button class="btn btn-mini" onclick="confirmUpgradePurchase('speed', 1)">+1 (${costPerUpgrade} 🪙)</button>
                <button class="btn btn-mini" onclick="confirmUpgradePurchase('speed', 10)">+10 (${costPerUpgrade * 10} 🪙)</button>
                <button class="btn btn-max" onclick="confirmUpgradePurchase('speed', 'max')">MAX</button>
            </div>
        </div>
    `;
}

// Fonction pour confirmer l'achat d'une amélioration
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

// DEFINITION DU PRIX DE BASE DE OEUF
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
      saveState();

      // Afficher le message de confirmation et mettre à jour l'affichage
      showModal('Félicitations !', `Vous avez fait éclore un ${newMonster.rarity} ${newMonster.name} !`);
      renderCollection();
      renderMain();
      renderShop();
    }
  );
}

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

// La fonction renderShop utilise maintenant getEggCost
function renderShop(){
    const eggCost = getEggCost();
    document.getElementById('egg-cost-text').textContent = `${eggCost} or`;

    // Affiche la section des améliorations
    renderUpgradeShop();

    // Affiche la nouvelle section d'objets
    renderItemShop(); 
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
    
    state.playerItems.forEach(item => {
        const isEquipped = state.playerMonsters.some(m => Object.values(m.equippedItems).includes(item));
        
        const itemCard = document.createElement('div');
        // Ajout de la classe de rareté à la carte
        itemCard.className = `card item-card rarety-${item.rarity}`;
        itemCard.innerHTML = `
            <h3>${item.name}</h3>
            <p>${item.description}</p>
            <img src="${item.image}" alt="${item.name}" class="item-image">
            ${isEquipped ?
                `<button class="btn btn-unequip" onclick="unequipItem('${item.type}')">Déséquiper</button>`
                :
                `<button class="btn btn-equip" onclick="equipItem('${item.id}')">Équiper</button>`
            }
        `;
        inventoryGrid.appendChild(itemCard);
    });
    
    // NOUVEAU: Si l'inventaire est vide et qu'il y a des objets équipés, il n'y a rien à afficher
    if(state.playerItems.length === 0 && Object.keys(state.activeMonsterId && getActiveMonster().equippedItems || {}).length > 0){
        inventoryGrid.innerHTML += `<p>Tous vos objets sont équipés sur vos monstres.</p>`;
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
  
    // Vérifier si un objet du même type est déjà équipé
    const existingItem = activeMonster.equippedItems[itemToEquip.type];
    if (existingItem) {
        // Déséquiper l'ancien objet et le remettre dans l'inventaire
        state.playerItems.push(existingItem);
        // Important: si on remplace un objet de vie, il faut ajuster les PV du monstre.
        if (existingItem.type === 'hp') {
            const totalMaxHp = activeMonster.maxHp + (itemToEquip.bonus || 0);
            activeMonster.hp = Math.min(activeMonster.hp - existingItem.bonus, totalMaxHp);
        }
        showModal('Objet remplacé', `Vous avez remplacé l'objet "${existingItem.name}" par "${itemToEquip.name}".`);
    }

    // Équiper le nouvel objet
    activeMonster.equippedItems[itemToEquip.type] = itemToEquip;
    state.playerItems.splice(itemIndex, 1);
  
    // Mettre à jour les HP si c'est une potion de vie
    if (itemToEquip.type === 'hp') {
        const totalMaxHp = activeMonster.maxHp + itemToEquip.bonus;
        activeMonster.hp = Math.min(activeMonster.hp + itemToEquip.bonus, totalMaxHp);
    }
  
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
    
    // Pour chaque objet équipé
    Object.values(activeMonster.equippedItems).forEach(item => {
        // Remettre l'objet dans l'inventaire
        state.playerItems.push(item);
    });
    
    // Vider l'objet des équipements
    activeMonster.equippedItems = {};
    
    // Mettre à jour les HP actuels du monstre en cas de déséquipement d'une potion
    const totalMaxHp = activeMonster.maxHp;
    activeMonster.hp = Math.min(activeMonster.hp, totalMaxHp);

    saveState();
    renderMain();
    renderInventory();
    showModal('Déséquipement réussi !', 'Tous les objets ont été déséquipés et remis dans votre inventaire.');
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
        const bonusHp = oldActiveMonster.equippedItems.hp ? oldActiveMonster.equippedItems.hp.bonus : 0;
        oldActiveMonster.hp = Math.min(oldActiveMonster.hp, oldActiveMonster.maxHp + bonusHp);
    }

    // 2. Définir le nouveau monstre actif
    state.activeMonsterId = monsterId;

    saveState();
    renderMain();
    renderInventory();
    showScreen('main'); // <-- NOUVEAU : on retourne à l'écran principal
}

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

function hatchEgg(rarity){
  const pool = SPECIES[rarity];
  if(!pool || !pool.length) return showModal('Œuf vide', `Aucune espèce définie pour ${rarity}.`);
  const species = choice(pool);
  const mon = createMonsterFromSpecies(species);
  state.playerMonsters.push(mon);
  if(!state.activeMonsterId) state.activeMonsterId = mon.id;
  showModal('Œuf éclos', `Vous obtenez <b>${mon.name}</b> (${mon.type}, ${mon.rarity}) avec des statistiques uniques !`);
}

// ---- XP & montée de niveau
function gainXp(mon, xp){
  mon.xp += Math.floor(xp);
  while(mon.xp >= mon.xpNeeded){
    mon.xp -= mon.xpNeeded;
    mon.level += 1;
    const baseStats = getSpecies(mon.name); 
    mon.attack += Math.floor(baseStats.attack * 0.1);
    mon.defense += Math.floor(baseStats.defense * 0.1);
    mon.speed += 1;
    mon.maxHp += Math.floor(baseStats.hp * 0.15);
    mon.hp = mon.maxHp;
    mon.xpNeeded = xpNeeded(mon.level);
    showModal('Niveau supérieur', `${mon.name} passe <b>niveau ${mon.level}</b> !`);
  }
  renderMain();
}

// ---- Tour & génération d'ennemis
function pickEnemySpecies(floor){
  // Si l'étage est un étage de boss, on choisit une espèce de boss
  if(BOSS_FLOORS.includes(floor)){
    return choice(BOSS_SPECIES);
  }

  // Sinon, la logique normale de sélection s'applique
  const roll = Math.random();
  if(floor > 15 && roll < 0.15) return choice(SPECIES.epic);
  if(floor > 5  && roll < 0.35) return choice(SPECIES.rare);
  return choice(SPECIES.common);
}
function scaleEnemyFromSpecies(species, floor){
  const foe = createMonsterFromSpecies(species);
  
  // NOUVEAU : On ajoute une propriété "isBoss" pour savoir si c'est un boss
  foe.isBoss = BOSS_SPECIES.some(boss => boss.name === foe.name);

  // Scaling : augmente niveau et stats avec l'étage
  const bonusLvl = Math.floor(floor/2);
  foe.level = Math.max(1, bonusLvl);
  
  const atkBonus = Math.floor(floor * 1.0);
  const defBonus = Math.floor(floor * 0.8);
  const hpBonus  = Math.floor(floor * 2);
  const spdBonus = Math.floor(floor * 0.2);
  
  // Ajout d'une variabilité supplémentaire pour les ennemis (±10%)
  const enemyVariance = 0.1;
  const varyBonus = (bonus) => {
    if (bonus <= 0) return bonus;
    const min = Math.floor(bonus * (1 - enemyVariance));
    const max = Math.floor(bonus * (1 + enemyVariance));
    return rand(min, max);
  };
  
  foe.attack += varyBonus(atkBonus);
  foe.defense += varyBonus(defBonus);
  foe.maxHp += varyBonus(hpBonus);
  foe.hp = foe.maxHp;
  foe.speed += varyBonus(spdBonus);

  // NOUVEAU : Bonus de stats pour les boss
  if(foe.isBoss){
    foe.maxHp = Math.floor(foe.maxHp * 1.2);
    foe.hp = foe.maxHp;
    foe.attack = Math.floor(foe.attack * 1.2);
    foe.defense = Math.floor(foe.defense * 1.2);
    foe.speed = Math.floor(foe.speed * 1.1);
  }
  
  return foe;
}

// ---- Combat (tours + ATB bonus)
function startTowerRun(){
  if(state.energy <= 0) return showModal('Énergie insuffisante','Vous n\'avez plus d\'énergie.');
  const m = getActiveMonster(); if(!m) return showModal('Aucun monstre','Activez un monstre.');
  
  // NOUVELLE LIGNE : On initialise l'étage max si la propriété n'existe pas encore
  if (m.maxFloor === undefined) {
    m.maxFloor = 0;
  }
  
  state.energy -= 1;
  const bonusHp = m.equippedItems.hp ? m.equippedItems.hp.bonus : 0;
  m.hp = m.maxHp + bonusHp; 
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

     // --- NOUVELLE LOGIQUE : Mettre à jour l'étage max
      if (state.currentFloor > monster.maxFloor) {
          monster.maxFloor = state.currentFloor;
      }
      
      if(BOSS_FLOORS.includes(state.currentFloor)) {
          const dropChance = 20; 
          if(Math.random() * 100 < dropChance) {
              const randomItem = BOSS_LOOT_TABLE[Math.floor(Math.random() * BOSS_LOOT_TABLE.length)];
              state.playerItems.push(randomItem);
              showModal('Victoire !', `Vous avez vaincu le boss et avez obtenu un objet : ${randomItem.name} !`);
          } else {
              showModal('Victoire !', `Vous avez vaincu le boss, mais n'avez pas obtenu l'objet rare. Retentez votre chance !`);
           }
      }

      state.currentFloor += 1;
      renderMain();
      runNextFloor(monster); 

    } else {
      const bonusHp = monster.equippedItems.hp ? monster.equippedItems.hp.bonus : 0;
      monster.hp = monster.maxHp + bonusHp;
      state.currentFloor = 1;
      document.getElementById('backToMain').disabled = false;
      showModal('Fin de la run', `${monster.name} a été vaincu. Retour au menu.`);
      showScreen('main');
    }
  });
}

// ---- Combat core
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
    // Calcul des statistiques totales du joueur avec les bonus d'objets
    const bonusAttack = player.equippedItems.attack ? player.equippedItems.attack.bonus : 0;
    const bonusDefense = player.equippedItems.defense ? player.equippedItems.defense.bonus : 0;
    const bonusSpeed = player.equippedItems.speed ? player.equippedItems.speed.bonus : 0;
    const bonusHp = player.equippedItems.hp ? player.equippedItems.hp.bonus : 0;
  
    const totalAttack = player.attack + bonusAttack;
    const totalDefense = player.defense + bonusDefense;
    const totalSpeed = player.speed + bonusSpeed;
    const totalMaxHp = player.maxHp + bonusHp;
  
    const pHP = clamp((player.hp/totalMaxHp)*100,0,100);
    const eHP = clamp((enemy.hp/enemy.maxHp)*100,0,100);
    const pATB = clamp(state.battle.atb.player,0,ATB_FULL);
    const eATB = clamp(state.battle.atb.enemy,0,ATB_FULL);
    arena.innerHTML = `
      <div class="card">
        <img class="monster-img" src="${player.image}" alt="${player.name}">
        <h3>${player.name} <span class="badge ${player.rarity}">${player.rarity.toUpperCase()}</span></h3>
        <div class="statline">Type ${player.type} — Nv ${player.level}</div>
        <div class="bar hpbar"><div class="hpfill" style="width:${pHP}%"></div></div>
        <div class="bar atbbar"><div class="atbfill" style="width:${(pATB/ATB_FULL)*100}%"></div></div>
        <div class="statline">ATQ ${totalAttack} • DEF ${totalDefense} • VIT ${totalSpeed} • PV ${player.hp}/${totalMaxHp}</div>
      </div>
      <div class="card">
        <img class="monster-img" src="${enemy.image}" alt="${enemy.name}">
        <h3>${enemy.name} <span class="badge ${enemy.rarity}">${enemy.rarity.toUpperCase()}</span></h3>
        <div class="statline">Type ${enemy.type} — Nv ${enemy.level}</div>
        <div class="bar hpbar"><div class="hpfill" style="width:${eHP}%"></div></div>
        <div class="bar atbbar"><div class="atbfill" style="width:${(eATB/ATB_FULL)*100}%"></div></div>
        <div class="statline">ATQ ${enemy.attack} • DEF ${enemy.defense} • VIT ${enemy.speed} • PV ${enemy.hp}/${enemy.maxHp}</div>
      </div>
    `;
}


  
  function logLine(t){ log.innerHTML += `<div>• ${t}</div>`; log.scrollTop = log.scrollHeight; }

  // Dégâts avec affinités
  
  function dealDamage(attacker, defender, source){
      // 1. Calculer l'attaque totale de l'attaquant (avec bonus d'objet)
      const bonusAttack = attacker.equippedItems.attack ? attacker.equippedItems.attack.bonus : 0;
      const totalAttack = attacker.attack + bonusAttack;

      // 2. Calculer la défense totale du défenseur (avec bonus d'objet)
      const bonusDefense = defender.equippedItems.defense ? defender.equippedItems.defense.bonus : 0;
      const totalDefense = defender.defense + bonusDefense;

      // 3. Utiliser les statistiques totales dans le calcul des dégâts
      const base = Math.max(1, totalAttack - totalDefense);
      const mult = typeMultiplier(attacker.type, defender.type);
      const dmg = Math.max(1, Math.floor(base * mult));
      
      // 4. Appliquer les dégâts
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
    state.battle.atb.player += player.speed * ATB_FILL_BASE * spd * 0.1;
    state.battle.atb.enemy  += enemy.speed  * ATB_FILL_BASE * spd * 0.1;
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

// Fonction appelée à la fin d'un combat (récupère le résultat 'win' ou 'lose')
function onEnd(result) {
    const activeMonster = getActiveMonster();

    // Mettre à jour les HP du monstre du joueur avec les HP restants de la bataille
    if (state.battle && state.battle.player && activeMonster) {
        activeMonster.hp = state.battle.player.hp;
    }
    
    // Si la bataille est gagnée
    if (result === 'win') {
        const xpGain = state.battle.enemy.xpValue;
        activeMonster.xp += xpGain;
        logLine(`${activeMonster.name} gagne ${xpGain} XP !`);
        
        // Logique de montée de niveau
        if (activeMonster.xp >= activeMonster.xpNeeded) {
            // Votre code de montée de niveau
        }
    } else if (result === 'lose') {
        // Logique en cas de défaite
    }
    
    // Nettoyer l'état de la bataille
    state.battle.running = false;
    
    // Mettre à jour l'affichage
    renderMain();
    saveState();
}

function toggleBattleSpeed(){
  state.battle.speedIndex = (state.battle.speedIndex + 1) % SPEED_STEPS.length;
  updateSpeedBtn();
}
function updateSpeedBtn(){
  const btn = document.getElementById('speedBtn');
  if(btn) btn.textContent = `⚡ Vitesse x${SPEED_STEPS[state.battle.speedIndex]}`;
}

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


// ---- Vendre un monstre
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

// Fonction utilitaire pour calculer le prix de base d'un monstre
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

// CODE SERVANT A LA MISE EN PLACE DU TRI DES PETIS MONSTRES DANS LA COLLECTION

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

// ---- Initialisation : donner 1 monstre commun gratuit si vide
function bootstrap() {
  // On lance la boucle de mise à jour de l'énergie
  startEnergyRegen();

  // On affiche l'écran d'accueil
  showScreen('home');
  
  // On vérifie s'il y a une sauvegarde pour afficher le bouton 'Continuer'
  checkSavedGameAndShowButton();
}
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
  showScreen('main');// Va sur l'écran principal après le chargement
  toggleMusic();
  document.getElementById('game-music').volume = 0.5; 
}

function resetAndReload(slot) {
  resetState(slot);
  showSaveLoadModal(); // Affiche à nouveau la modale pour voir le changement
}

// Fonction pour lancer une nouvelle partie
// Fonction pour lancer une nouvelle partie
function startNewGame() {
  // Réinitialise l'état du jeu pour une nouvelle partie
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
    playerItems: [] 
  };
  
  // Donne un monstre de départ
  const sp = choice(SPECIES.common);
  const mon = createMonsterFromSpecies(sp);
  state.playerMonsters.push(mon);
  state.activeMonsterId = mon.id;
  
  saveState(1); // Sauvegarde la nouvelle partie dans l'emplacement 1
  
  showModal('Bienvenue !', `Vous recevez ${mon.name} pour commencer votre aventure !`);
  showScreen('main'); // Va sur l'écran principal
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