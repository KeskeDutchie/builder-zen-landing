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

const attunements = [
  "Flamecharm",
  "Frostdraw",
  "Thundercall",
  "Galebreathe",
  "Shadowcast",
  "Ironsing",
  "Attunementless",
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
  const [build, setBuild] = useState<Build>({
    name: "New Build",
    level: 1,
    class: "Flamecharm",
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

  const updateLevel = (newLevel: number) => {
    const levelDiff = newLevel - build.level;
    const pointsFromLevel = levelDiff * 5; // 5 stat points per level
    setStatPoints((prev) => prev + pointsFromLevel);
    setBuild({ ...build, level: newLevel });
  };

  const totalStatsUsed = build.stats.reduce((sum, stat) => sum + stat.value, 0);
  const maxPossibleStats = Math.min(build.level * 3 + 15, 327); // Deepwoken stat scaling

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
      case "Attunementless":
        return ["Strength", "Fortitude", "Agility"];
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
                <Label htmlFor="attunement">Primary Attunement</Label>
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
                    {attunements.map((att) => (
                      <SelectItem key={att} value={att}>
                        {att}
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
                  {getAttunementRecommendations(build.class).map((stat) => (
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
              <CardTitle>Stat Investment</CardTitle>
              <CardDescription>
                Allocate investment points to your character's stats
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
                        {getAttunementRecommendations(build.class).includes(
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
            <CardDescription>
              Overview of your Deepwoken character build
            </CardDescription>
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
