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
import { ArrowLeft, Save, Share2, Download } from "lucide-react";
import { Link } from "react-router-dom";

interface BuildStat {
  name: string;
  value: number;
  max: number;
  description: string;
}

interface Build {
  name: string;
  level: number;
  class: string;
  stats: BuildStat[];
}

const classes = [
  "Warrior",
  "Mage",
  "Archer",
  "Assassin",
  "Paladin",
  "Necromancer",
];

const statDescriptions = {
  Strength: "Increases physical damage and carrying capacity",
  Dexterity: "Improves accuracy, critical hit chance, and movement speed",
  Intelligence: "Boosts mana pool and magical damage",
  Vitality: "Increases health points and natural healing",
  Defense: "Reduces incoming physical damage",
  "Magic Resist": "Reduces incoming magical damage",
};

export default function BuildEditor() {
  const [build, setBuild] = useState<Build>({
    name: "New Build",
    level: 1,
    class: "Warrior",
    stats: [
      {
        name: "Strength",
        value: 10,
        max: 150,
        description: statDescriptions.Strength,
      },
      {
        name: "Dexterity",
        value: 10,
        max: 150,
        description: statDescriptions.Dexterity,
      },
      {
        name: "Intelligence",
        value: 10,
        max: 150,
        description: statDescriptions.Intelligence,
      },
      {
        name: "Vitality",
        value: 10,
        max: 150,
        description: statDescriptions.Vitality,
      },
      {
        name: "Defense",
        value: 10,
        max: 150,
        description: statDescriptions.Defense,
      },
      {
        name: "Magic Resist",
        value: 10,
        max: 150,
        description: statDescriptions["Magic Resist"],
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

  const updateLevel = (newLevel: number) => {
    const levelDiff = newLevel - build.level;
    const pointsFromLevel = levelDiff * 5; // 5 stat points per level
    setStatPoints((prev) => prev + pointsFromLevel);
    setBuild({ ...build, level: newLevel });
  };

  const totalStatsUsed = build.stats.reduce((sum, stat) => sum + stat.value, 0);
  const maxPossibleStats = build.level * 5 + 60; // Base 60 + 5 per level

  const getClassRecommendations = (className: string) => {
    switch (className) {
      case "Warrior":
        return ["Strength", "Vitality", "Defense"];
      case "Mage":
        return ["Intelligence", "Vitality", "Magic Resist"];
      case "Archer":
        return ["Dexterity", "Strength", "Vitality"];
      case "Assassin":
        return ["Dexterity", "Intelligence", "Strength"];
      case "Paladin":
        return ["Strength", "Vitality", "Defense"];
      case "Necromancer":
        return ["Intelligence", "Magic Resist", "Vitality"];
      default:
        return [];
    }
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
                <h1 className="text-2xl font-bold">Build Editor</h1>
                <p className="text-muted-foreground">
                  Configure your character build
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
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Build Info */}
          <Card className="lg:col-span-1">
            <CardHeader>
              <CardTitle>Build Information</CardTitle>
              <CardDescription>
                Basic settings for your character build
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
                <Label htmlFor="character-class">Character Class</Label>
                <Select
                  value={build.class}
                  onValueChange={(value) =>
                    setBuild({ ...build, class: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {classes.map((cls) => (
                      <SelectItem key={cls} value={cls}>
                        {cls}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between">
                  <Label htmlFor="level">Level</Label>
                  <span className="text-sm text-muted-foreground">
                    {build.level}
                  </span>
                </div>
                <Slider
                  value={[build.level]}
                  onValueChange={([value]) => updateLevel(value)}
                  max={100}
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
                  Recommended for {build.class}
                </span>
                <div className="flex flex-wrap gap-1">
                  {getClassRecommendations(build.class).map((stat) => (
                    <Badge key={stat} variant="outline" className="text-xs">
                      {stat}
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Stats Configuration */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Attribute Distribution</CardTitle>
              <CardDescription>
                Allocate points to your character's attributes
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {build.stats.map((stat, index) => (
                  <div key={index} className="space-y-3">
                    <div className="flex justify-between items-center">
                      <Label className="font-medium">{stat.name}</Label>
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-muted-foreground">
                          {stat.value}
                        </span>
                        {getClassRecommendations(build.class).includes(
                          stat.name,
                        ) && (
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
            </CardContent>
          </Card>
        </div>

        {/* Build Summary */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Build Summary</CardTitle>
            <CardDescription>Overview of your configured build</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-gaming-cyan">
                  {build.level}
                </div>
                <div className="text-sm text-muted-foreground">Level</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-gaming-purple">
                  {totalStatsUsed}
                </div>
                <div className="text-sm text-muted-foreground">Total Stats</div>
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
                  Points Remaining
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
