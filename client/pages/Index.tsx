import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import {
  ArrowRight,
  Zap,
  Target,
  TrendingUp,
  Plus,
  Edit3,
  Copy,
  RotateCcw,
} from "lucide-react";
import { Link } from "react-router-dom";

interface BuildStat {
  name: string;
  current: number;
  target: number;
  max: number;
}

interface Build {
  name: string;
  level: number;
  class: string;
  stats: BuildStat[];
}

export default function Index() {
  const [currentBuild, setCurrentBuild] = useState<Build>({
    name: "My Current Build",
    level: 42,
    class: "Warrior",
    stats: [
      { name: "Strength", current: 85, target: 120, max: 150 },
      { name: "Dexterity", current: 45, target: 60, max: 150 },
      { name: "Intelligence", current: 30, target: 25, max: 150 },
      { name: "Vitality", current: 70, target: 100, max: 150 },
      { name: "Defense", current: 65, target: 95, max: 150 },
      { name: "Magic Resist", current: 40, target: 50, max: 150 },
    ],
  });

  const [targetBuild, setTargetBuild] = useState<Build>({
    name: "Optimal DPS Build",
    level: 60,
    class: "Warrior",
    stats: [
      { name: "Strength", current: 120, target: 120, max: 150 },
      { name: "Dexterity", current: 60, target: 60, max: 150 },
      { name: "Intelligence", current: 25, target: 25, max: 150 },
      { name: "Vitality", current: 100, target: 100, max: 150 },
      { name: "Defense", current: 95, target: 95, max: 150 },
      { name: "Magic Resist", current: 50, target: 50, max: 150 },
    ],
  });

  const getStatDifference = (current: number, target: number) => {
    const diff = target - current;
    return {
      value: diff,
      percentage: Math.abs(diff),
      status: diff > 0 ? "increase" : diff < 0 ? "decrease" : "match",
    };
  };

  const getOverallProgress = (stats: BuildStat[]) => {
    const totalProgress = stats.reduce((acc, stat) => {
      const progress = (stat.current / stat.target) * 100;
      return acc + Math.min(progress, 100);
    }, 0);
    return Math.round(totalProgress / stats.length);
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <div className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-gaming-cyan via-gaming-purple to-gaming-gold bg-clip-text text-transparent">
                BuildForge
              </h1>
              <p className="text-muted-foreground mt-1">
                Compare and optimize your game builds
              </p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <Copy className="w-4 h-4 mr-2" />
                Import Build
              </Button>
              <Button
                size="sm"
                className="bg-gaming-cyan hover:bg-gaming-cyan/90"
                asChild
              >
                <Link to="/build-editor">
                  <Plus className="w-4 h-4 mr-2" />
                  New Build
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="border-gaming-cyan/20">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-gaming-cyan flex items-center">
                <Target className="w-4 h-4 mr-2" />
                Build Progress
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {getOverallProgress(currentBuild.stats)}%
              </div>
              <Progress
                value={getOverallProgress(currentBuild.stats)}
                className="mt-2"
              />
            </CardContent>
          </Card>

          <Card className="border-gaming-purple/20">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-gaming-purple flex items-center">
                <TrendingUp className="w-4 h-4 mr-2" />
                Stats to Improve
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {
                  currentBuild.stats.filter(
                    (stat) => stat.current < stat.target,
                  ).length
                }
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                attributes need work
              </p>
            </CardContent>
          </Card>

          <Card className="border-gaming-gold/20">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-gaming-gold flex items-center">
                <Zap className="w-4 h-4 mr-2" />
                Level Gap
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {targetBuild.level - currentBuild.level}
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                levels to target
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Main Comparison */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Current Build */}
          <Card className="h-fit">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    {currentBuild.name}
                    <Badge variant="secondary">{currentBuild.class}</Badge>
                  </CardTitle>
                  <CardDescription>Level {currentBuild.level}</CardDescription>
                </div>
                <Button variant="ghost" size="sm" asChild>
                  <Link to="/build-editor">
                    <Edit3 className="w-4 h-4" />
                  </Link>
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {currentBuild.stats.map((stat, index) => {
                const diff = getStatDifference(stat.current, stat.target);
                return (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">{stat.name}</span>
                      <span className="text-sm text-muted-foreground">
                        {stat.current}/{stat.max}
                      </span>
                    </div>
                    <div className="space-y-1">
                      <Progress
                        value={(stat.current / stat.max) * 100}
                        className="h-2"
                      />
                      {diff.status !== "match" && (
                        <div
                          className={`text-xs flex items-center gap-1 ${
                            diff.status === "increase"
                              ? "text-gaming-warning"
                              : "text-gaming-success"
                          }`}
                        >
                          {diff.status === "increase" ? "+" : ""}
                          {diff.value} to target
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </CardContent>
          </Card>

          {/* Target Build */}
          <Card className="h-fit">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    {targetBuild.name}
                    <Badge variant="secondary">{targetBuild.class}</Badge>
                  </CardTitle>
                  <CardDescription>Level {targetBuild.level}</CardDescription>
                </div>
                <Button variant="ghost" size="sm" asChild>
                  <Link to="/build-editor">
                    <Edit3 className="w-4 h-4" />
                  </Link>
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {targetBuild.stats.map((stat, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">{stat.name}</span>
                    <span className="text-sm text-muted-foreground">
                      {stat.current}/{stat.max}
                    </span>
                  </div>
                  <Progress
                    value={(stat.current / stat.max) * 100}
                    className="h-2"
                  />
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 mt-8 justify-center">
          <Button className="bg-gaming-cyan hover:bg-gaming-cyan/90" size="lg">
            <ArrowRight className="w-4 h-4 mr-2" />
            Generate Build Path
          </Button>
          <Button variant="outline" size="lg">
            <RotateCcw className="w-4 h-4 mr-2" />
            Reset Comparison
          </Button>
        </div>

        {/* Quick Tips */}
        <Card className="mt-8 border-gaming-success/20">
          <CardHeader>
            <CardTitle className="text-gaming-success">
              Build Optimization Tips
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <h4 className="font-medium mb-2">Priority Stats:</h4>
                <ul className="space-y-1 text-muted-foreground">
                  <li>• Focus on Strength first (+35 needed)</li>
                  <li>• Increase Vitality for survivability (+30)</li>
                  <li>• Boost Defense for damage reduction (+30)</li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium mb-2">Recommended Actions:</h4>
                <ul className="space-y-1 text-muted-foreground">
                  <li>• Farm level 45+ dungeons for XP</li>
                  <li>• Equip Strength-boosting gear</li>
                  <li>• Consider respec if over-invested in Intelligence</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
