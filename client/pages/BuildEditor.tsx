import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  ArrowLeft,
  Save,
  Share2,
  Download,
  Sword,
  Clipboard,
  Check,
  Zap,
  Target,
} from "lucide-react";
import { Link } from "react-router-dom";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";

interface BuildStat {
  name: string;
  value: number;
  max: number;
  description: string;
}

interface Build {
  name: string;
  power: number;
  attunements: Record<string, number>;
  weapons: Record<string, number>;
  stats: BuildStat[];
  talents?: string[];
  mantras?: string[];
}

const attunements = [
  "Flamecharm",
  "Frostdraw",
  "Thundercall",
  "Galebreathe",
  "Shadowcast",
  "Ironsing",
  "Bloodrend",
];

const weaponTypes = [
  "Heavy Weapons",
  "Medium Weapons",
  "Light Weapons",
  "Guns",
  "Fist Fighting",
];

const sampleTalents = [
  "Fleet Footed",
  "Strong Left",
  "Cheap Shot",
  "Concussive Force",
  "Spine Cutter",
  "Bloodlust",
  "Rapid Slashes",
  "Vital Point",
  "Pressure Point Strike",
  "Tempo Surge",
  "Demolition",
  "Shoulder Throw",
  "Aerial Combo",
  "Blade Mastery",
];

const sampleMantras = [
  "Flame Grab",
  "Fire Gun",
  "Flame Blind",
  "Flame Wisp",
  "Grand Fire Eruption",
  "Fire Forge",
  "Cremation",
  "Rising Flame",
  "Magnet Pull",
  "Lightning Clones",
  "Thunder Kick",
  "Spark Swap",
  "Grand Javelin",
  "Voltaic Flash",
  "Thunder Spear Throw",
];

const statDescriptions = {
  Strength: "Increases damage with Heavy and Medium weapons, carry load",
  Fortitude: "Increases health points and physical defense",
  Agility: "Increases damage with Light weapons and movement speed",
  Intelligence: "Increases ether capacity and magic damage",
  Willpower: "Increases ether regeneration and magic scaling",
  Charisma: "Increases reputation gain and NPC interactions",
};

export default function BuildEditor() {
  const [importData, setImportData] = useState("");
  const [checkedTalents, setCheckedTalents] = useState<string[]>([]);
  const [checkedMantras, setCheckedMantras] = useState<string[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [importSuccess, setImportSuccess] = useState(false);

  const toggleTalent = (talent: string) => {
    setCheckedTalents((prev) =>
      prev.includes(talent)
        ? prev.filter((t) => t !== talent)
        : [...prev, talent],
    );
  };

  const toggleMantra = (mantra: string) => {
    setCheckedMantras((prev) =>
      prev.includes(mantra)
        ? prev.filter((m) => m !== mantra)
        : [...prev, mantra],
    );
  };

  const parseDeepwokenData = (data: string) => {
    // TODO: Implement actual parsing logic for Deepwoken export data
    console.log("Parsing Deepwoken data:", data);

    setIsProcessing(true);
    setTimeout(() => {
      // TODO: Replace with actual parsing logic
      // For now, simulate importing some sample data
      if (data.toLowerCase().includes("flame")) {
        setCheckedTalents(["Bloodlust", "Fleet Footed", "Vital Point"]);
        setCheckedMantras(["Flame Grab", "Fire Gun", "Rising Flame"]);
        setBuild((prev) => ({
          ...prev,
          name: "Imported Flamecharm Build",
          power: 15,
          attunements: {
            ...prev.attunements,
            Flamecharm: 75,
          },
          weapons: {
            ...prev.weapons,
            "Medium Weapons": 50,
          },
          talents: ["Bloodlust", "Fleet Footed", "Vital Point"],
          mantras: ["Flame Grab", "Fire Gun", "Rising Flame"],
        }));
      }

      // This would parse the copied data from Deepwoken and extract:
      // - Stats, Power level, Attunement, Weapon type, Talents, Mantras
      // const parsed = parseGameData(data);
      // setBuild(prev => ({ ...prev, ...parsed }));
      // setCheckedTalents(parsed.talents || []);
      // setCheckedMantras(parsed.mantras || []);

      setIsProcessing(false);
      setImportSuccess(true);
      setTimeout(() => setImportSuccess(false), 2000);
    }, 1000);
  };

  const [build, setBuild] = useState<Build>({
    name: "New Build",
    power: 1,
    attunements: {
      Flamecharm: 0,
      Frostdraw: 0,
      Thundercall: 0,
      Galebreathe: 0,
      Shadowcast: 0,
      Ironsing: 0,
      Bloodrend: 0,
    },
    weapons: {
      "Light Weapons": 0,
      "Medium Weapons": 0,
      "Heavy Weapons": 0,
    },
    talents: [],
    mantras: [],
    stats: [
      {
        name: "Strength",
        value: 0,
        max: 100,
        description: statDescriptions.Strength,
      },
      {
        name: "Fortitude",
        value: 0,
        max: 100,
        description: statDescriptions.Fortitude,
      },
      {
        name: "Agility",
        value: 0,
        max: 100,
        description: statDescriptions.Agility,
      },
      {
        name: "Intelligence",
        value: 0,
        max: 100,
        description: statDescriptions.Intelligence,
      },
      {
        name: "Willpower",
        value: 0,
        max: 100,
        description: statDescriptions.Willpower,
      },
      {
        name: "Charisma",
        value: 0,
        max: 100,
        description: statDescriptions.Charisma,
      },
    ],
  });

  const [statPoints, setStatPoints] = useState(0);

  const updateStat = (index: number, newValue: number) => {
    const newStats = [...build.stats];
    const oldValue = newStats[index].value;
    newStats[index].value = newValue;

    const pointDiff = oldValue - newValue;
    setStatPoints((prev) => prev + pointDiff);
    setBuild({ ...build, stats: newStats });
  };

  const updatePower = (newPower: number) => {
    const powerDiff = newPower - build.power;
    const pointsFromPower = powerDiff * 15; // 15 stat points per power level
    setStatPoints((prev) => prev + pointsFromPower);
    setBuild({ ...build, power: newPower });
  };

  const totalStatsUsed = build.stats.reduce((sum, stat) => sum + stat.value, 0);
  const maxPossibleStats = 30 + build.power * 15; // 30 base stats + 15 per power level in Deepwoken

  const getAttunementRecommendations = (attunement: string) => {
    switch (attunement) {
      case "Flamecharm":
        return ["Intelligence", "Willpower", "Fortitude"];
      case "Frostdraw":
        return ["Intelligence", "Willpower", "Fortitude"];
      case "Thundercall":
        return ["Intelligence", "Willpower", "Agility"];
      case "Galebreathe":
        return ["Intelligence", "Willpower", "Agility"];
      case "Shadowcast":
        return ["Intelligence", "Willpower", "Charisma"];
      case "Ironsing":
        return ["Intelligence", "Willpower", "Strength"];
      case "Bloodrend":
        return ["Intelligence", "Willpower", "Strength"];
      case "No Attunement":
        return ["Strength", "Fortitude", "Agility"];
      default:
        return [];
    }
  };

  const updateAttunement = (attunement: string, value: number) => {
    setBuild((prev) => ({
      ...prev,
      attunements: {
        ...prev.attunements,
        [attunement]: value,
      },
    }));
  };

  const updateWeapon = (weapon: string, value: number) => {
    setBuild((prev) => ({
      ...prev,
      weapons: {
        ...prev.weapons,
        [weapon]: value,
      },
    }));
  };

  const getPrimaryAttunement = () => {
    const maxAttunement = Object.entries(build.attunements).reduce((a, b) =>
      a[1] > b[1] ? a : b,
    );
    return maxAttunement[1] > 0 ? maxAttunement[0] : "No Attunement";
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <div className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="sm" asChild>
                <Link to="/">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Comparison
                </Link>
              </Button>
              <div>
                <h1 className="text-2xl font-bold">Import Current Build</h1>
                <p className="text-muted-foreground">
                  Import your current Deepwoken character data
                </p>
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <Share2 className="w-4 h-4 mr-2" />
                Share
              </Button>
              <Button variant="outline" size="sm">
                <Download className="w-4 h-4 mr-2" />
                Export
              </Button>
              <Button
                size="sm"
                className="bg-gaming-success hover:bg-gaming-success/90"
              >
                <Save className="w-4 h-4 mr-2" />
                Save Build
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Import Section */}
        <Card className="mb-8 border-gaming-cyan/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clipboard className="w-5 h-5 text-gaming-cyan" />
              Import from Deepwoken
            </CardTitle>
            <CardDescription>
              Copy your character data from Deepwoken and paste it here to
              automatically populate your build
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <Label htmlFor="import-data">Deepwoken Export Data</Label>
                <Textarea
                  id="import-data"
                  value={importData}
                  onChange={(e) => setImportData(e.target.value)}
                  placeholder="Paste your exported data from Deepwoken here..."
                  className="mt-1 min-h-[120px] font-mono text-sm"
                />
              </div>
              <Button
                onClick={() => parseDeepwokenData(importData)}
                disabled={!importData.trim() || isProcessing}
                className="bg-gaming-cyan hover:bg-gaming-cyan/90"
              >
                {isProcessing ? (
                  <>
                    <Download className="w-4 h-4 mr-2 animate-spin" />
                    Processing...
                  </>
                ) : importSuccess ? (
                  <>
                    <Check className="w-4 h-4 mr-2" />
                    Imported Successfully!
                  </>
                ) : (
                  <>
                    <Download className="w-4 h-4 mr-2" />
                    Import Build Data
                  </>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Build Info */}
          <Card className="lg:col-span-1">
            <CardHeader>
              <CardTitle>Character Information</CardTitle>
              <CardDescription>
                Basic settings for your Deepwoken character
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="build-name">Build Name</Label>
                <Input
                  id="build-name"
                  value={build.name}
                  onChange={(e) => setBuild({ ...build, name: e.target.value })}
                  placeholder="Enter build name"
                />
              </div>

              <div className="space-y-2">
                <div className="flex justify-between">
                  <Label htmlFor="power">Power</Label>
                  <span className="text-sm text-muted-foreground">
                    {build.power}
                  </span>
                </div>
                <Slider
                  value={[build.power]}
                  onValueChange={([value]) => updatePower(value)}
                  max={20}
                  min={1}
                  step={1}
                  className="w-full"
                />
              </div>

              <Separator />

              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm font-medium">Available Points</span>
                  <Badge
                    variant={statPoints > 0 ? "default" : "secondary"}
                    className={
                      statPoints > 0
                        ? "bg-gaming-success text-background"
                        : undefined
                    }
                  >
                    {statPoints}
                  </Badge>
                </div>
                <div className="text-xs text-muted-foreground">
                  Total Stats: {totalStatsUsed}/{maxPossibleStats}
                </div>
              </div>

              <div className="space-y-2">
                <span className="text-sm font-medium">
                  Recommended for {getPrimaryAttunement()}
                </span>
                <div className="flex flex-wrap gap-1">
                  {getAttunementRecommendations(getPrimaryAttunement()).map(
                    (stat) => (
                      <Badge key={stat} variant="outline" className="text-xs">
                        {stat}
                      </Badge>
                    ),
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Stats Configuration */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Character Investment</CardTitle>
              <CardDescription>
                Allocate investment points to stats, attunements, and weapons
              </CardDescription>
            </CardHeader>
            <CardContent>
              {/* Attunement Investment */}
              <div className="mb-8">
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <Zap className="w-5 h-5 text-gaming-purple" />
                  Attunement Investment
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {attunements.map((attunement) => (
                    <div key={attunement} className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm font-medium">
                          {attunement}
                        </span>
                        <span className="text-sm text-muted-foreground">
                          {build.attunements[attunement]}
                        </span>
                      </div>
                      <Slider
                        value={[build.attunements[attunement]]}
                        onValueChange={([value]) =>
                          updateAttunement(attunement, value)
                        }
                        max={100}
                        min={0}
                        step={1}
                        className="w-full"
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Weapon Investment */}
              <div className="mb-8">
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <Sword className="w-5 h-5 text-gaming-gold" />
                  Weapon Investment
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {Object.keys(build.weapons).map((weapon) => (
                    <div key={weapon} className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm font-medium">{weapon}</span>
                        <span className="text-sm text-muted-foreground">
                          {build.weapons[weapon]}
                        </span>
                      </div>
                      <Slider
                        value={[build.weapons[weapon]]}
                        onValueChange={([value]) => updateWeapon(weapon, value)}
                        max={100}
                        min={0}
                        step={1}
                        className="w-full"
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Stats Investment */}
              <div>
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <Target className="w-5 h-5 text-gaming-cyan" />
                  Stats Investment
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {build.stats.map((stat, index) => (
                    <div key={index} className="space-y-3">
                      <div className="flex justify-between items-center">
                        <Label className="font-medium">{stat.name}</Label>
                        <div className="flex items-center gap-2">
                          <span className="text-sm text-muted-foreground">
                            {stat.value}
                          </span>
                          {getAttunementRecommendations(
                            getPrimaryAttunement(),
                          ).includes(stat.name) && (
                            <Badge
                              variant="outline"
                              className="text-xs text-gaming-success border-gaming-success"
                            >
                              Recommended
                            </Badge>
                          )}
                        </div>
                      </div>
                      <Slider
                        value={[stat.value]}
                        onValueChange={([value]) => updateStat(index, value)}
                        max={stat.max}
                        min={1}
                        step={1}
                        className="w-full"
                      />
                      <p className="text-xs text-muted-foreground">
                        {stat.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Talents and Mantras */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
          {/* Talents */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Sword className="w-5 h-5 text-gaming-gold" />
                Talents
              </CardTitle>
              <CardDescription>
                Check off the talents you have acquired ({checkedTalents.length}{" "}
                selected)
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 gap-2 max-h-60 overflow-y-auto">
                {sampleTalents.map((talent) => (
                  <div key={talent} className="flex items-center space-x-2">
                    <Checkbox
                      id={`talent-${talent}`}
                      checked={checkedTalents.includes(talent)}
                      onCheckedChange={() => toggleTalent(talent)}
                    />
                    <Label
                      htmlFor={`talent-${talent}`}
                      className="text-sm cursor-pointer"
                    >
                      {talent}
                    </Label>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Mantras */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="w-5 h-5 text-gaming-purple" />
                Mantras
              </CardTitle>
              <CardDescription>
                Check off the mantras you have acquired ({checkedMantras.length}{" "}
                selected)
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 gap-2 max-h-60 overflow-y-auto">
                {sampleMantras.map((mantra) => (
                  <div key={mantra} className="flex items-center space-x-2">
                    <Checkbox
                      id={`mantra-${mantra}`}
                      checked={checkedMantras.includes(mantra)}
                      onCheckedChange={() => toggleMantra(mantra)}
                    />
                    <Label
                      htmlFor={`mantra-${mantra}`}
                      className="text-sm cursor-pointer"
                    >
                      {mantra}
                    </Label>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Build Summary */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Build Summary</CardTitle>
            <CardDescription>
              Overview of your Deepwoken character build
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-gaming-cyan">
                  {build.power}
                </div>
                <div className="text-sm text-muted-foreground">Power</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-gaming-purple">
                  {totalStatsUsed}
                </div>
                <div className="text-sm text-muted-foreground">
                  Investment Points
                </div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-gaming-gold">
                  {Math.max(...build.stats.map((s) => s.value))}
                </div>
                <div className="text-sm text-muted-foreground">
                  Highest Stat
                </div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-gaming-success">
                  {statPoints}
                </div>
                <div className="text-sm text-muted-foreground">
                  Knowledge Remaining
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
