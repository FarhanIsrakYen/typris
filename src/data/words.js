export const WORDS = {
  easy: [
    "the", "and", "for", "are", "but", "not", "you", "all", "can", "her",
    "was", "one", "our", "out", "day", "had", "hot", "oil", "sit", "now",
    "old", "top", "red", "let", "say", "she", "too", "use", "boy", "did",
    "get", "has", "him", "his", "how", "man", "new", "own", "big", "put",
    "end", "run", "try", "ask", "men", "way", "may", "air", "eye", "far",
    "ago", "act", "add", "age", "arm", "art", "bad", "bag", "bed", "bit",
    "box", "bus", "car", "cat", "cup", "cut", "dog", "eat", "egg", "fan",
    "fix", "fly", "fun", "gap", "god", "gun", "hat", "hit", "ice", "job",
    "key", "kid", "law", "leg", "lie", "lip", "map", "mix", "net", "nor",
    "odd", "pan", "pay", "pen", "pet", "pie", "pin", "pop", "pot", "raw",
    "row", "sea", "set", "six", "sky", "son", "sum", "sun", "tea", "ten",
    "tie", "tip", "toe", "ton", "toy", "two", "van", "war", "win", "yes"
  ],
  medium: [
    "code", "type", "fast", "game", "play", "word", "drop", "fall", "text",
    "next", "best", "keep", "must", "need", "help", "work", "turn", "move",
    "life", "back", "only", "come", "made", "find", "here", "know", "take",
    "want", "give", "most", "hand", "high", "year", "also", "just", "land",
    "time", "very", "when", "come", "each", "make", "like", "long", "look",
    "many", "over", "such", "them", "then", "some", "call", "down", "side",
    "been", "will", "from", "part", "into", "just", "head", "tell", "form",
    "much", "mean", "kind", "name", "show", "city", "home", "good", "road",
    "fire", "dark", "wind", "deep", "cold", "iron", "rock", "snow", "rain",
    "tree", "star", "moon", "fish", "bird", "wolf", "bear", "deer", "frog",
    "seed", "leaf", "root", "bark", "vine", "farm", "lake", "hill", "cave",
    "dust", "sand", "wave", "gold", "ruby", "jade", "silk", "wool", "clay"
  ],
  hard: [
    "quick", "brown", "jumps", "brain", "flame", "ghost", "magic", "power",
    "quest", "storm", "sword", "tower", "world", "pixel", "laser", "cyber",
    "robot", "turbo", "ultra", "blast", "chase", "clash", "crash", "dream",
    "flash", "force", "frost", "gloom", "grape", "heart", "light", "night",
    "ocean", "phase", "prime", "queen", "royal", "scale", "sharp", "shine",
    "skull", "spike", "split", "steel", "super", "swift", "thorn", "track",
    "trick", "vapor", "venom", "vivid", "watch", "witch", "youth", "zones",
    "about", "above", "after", "again", "along", "began", "being", "below",
    "black", "blood", "board", "bring", "build", "carry", "catch", "chain",
    "chair", "cheap", "check", "child", "claim", "class", "clean", "clear",
    "climb", "close", "cloud", "coach", "color", "count", "court", "cover",
    "cross", "dance", "death", "doubt", "dozen", "draft", "dress", "drink"
  ],
  expert: [
    "python", "rocket", "frozen", "launch", "stream", "charge", "shield",
    "temple", "legacy", "danger", "hunter", "galaxy", "vector", "matrix",
    "castle", "anchor", "bridge", "chrome", "cipher", "copper", "crystal",
    "dragon", "engine", "falcon", "garden", "harbor", "impact", "jungle",
    "knight", "legend", "marble", "needle", "oracle", "palace", "quartz",
    "riddle", "shadow", "silver", "summit", "thread", "throne", "timber",
    "tunnel", "vortex", "wander", "zenith", "border", "branch", "breath",
    "button", "camera", "canvas", "carbon", "center", "change", "choice",
    "circle", "coffee", "corner", "couple", "course", "custom", "damage",
    "debate", "demand", "design", "detail", "device", "direct", "divide",
    "double", "effect", "effort", "employ", "energy", "escape", "expand",
    "export", "extend", "fabric", "factor", "finger", "flight", "flower",
    "format", "fourth", "freeze", "future", "gather", "gentle", "global",
    "golden", "growth", "handle", "height", "hidden", "honest", "horror"
  ]
};

export function getAllWords() {
  return [...WORDS.easy, ...WORDS.medium, ...WORDS.hard, ...WORDS.expert];
}

export function getWordsForLevel(level) {
  if (level <= 3) return [...WORDS.easy, ...WORDS.medium];
  if (level <= 6) return [...WORDS.easy, ...WORDS.medium, ...WORDS.hard];
  return getAllWords();
}
