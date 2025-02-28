import React, { useState } from "react";
import {
  AlertCircle,
  CheckCircle,
  Code,
  Cpu,
  GitBranch,
  Timer,
} from "lucide-react";
import { Card, CardContent } from "./ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "./ui/tabs";

const CodeAnalyzer = () => {
  const [code, setCode] = useState(`function fibonacci(n) {
        if (n <= 1) return n;
        return fibonacci(n - 1) + fibonacci(n - 2);
    }
    console.log(fibonacci(5));`);
  const [loading, setLoading] = useState(false);
  const [analysis, setAnalysis] = useState(null);

  const handleAnalyze = async () => {
    setLoading(true);
    setAnalysis(null);

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/analyze-code/`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ code }),
        }
      );
      console.log("API URL: ", import.meta.env.VITE_API_URL);
      const data = await response.json();

      if (data.error) {
        setAnalysis({ error: data.error });
      } else {
        setAnalysis(data); // ✅ Directly use AI response
      }
    } catch (error) {
      setAnalysis({ error: "Error analyzing code. Please try again." });
    }

    setLoading(false);
  };

  const QualityIndicator = ({ score }) => (
    <div className="relative w-full h-4 bg-gray-700 rounded-full overflow-hidden">
      <div
        className={`absolute h-full transition-all duration-500 ${
          score >= 80
            ? "bg-green-500"
            : score >= 60
            ? "bg-yellow-500"
            : "bg-red-500"
        }`}
        style={{ width: `${score}%` }}
      />
    </div>
  );

  const IssueItem = ({ issue }) => (
    <div className="flex items-start gap-2 p-2 bg-gray-800 rounded-md">
      {issue.type === "warning" ? (
        <AlertCircle className="text-yellow-500" size={20} />
      ) : (
        <CheckCircle className="text-blue-500" size={20} />
      )}
      <span>{issue.message}</span>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-900 text-white p-2 sm:p-4">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-3 mb-4 sm:mb-6">
          <Cpu className="text-orange-400" size={24} />
          <h1 className="text-xl sm:text-2xl font-bold text-orange-400">
            Advanced Code Analyzer
          </h1>
        </div>

        <Card className="bg-gray-800 border-gray-700">
          <CardContent className="p-2 sm:p-4">
            <div className="relative mb-4 sm:mb-6">
              <textarea
                className="w-full h-32 sm:h-48 p-2 sm:p-4 bg-gray-900 text-white border border-gray-700 rounded-lg font-mono text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
                placeholder="Enter your code here..."
                value={code}
                onChange={(e) => setCode(e.target.value)}
                spellCheck={false}
              />
              <button
                className="absolute bottom-2 right-2 sm:bottom-4 sm:right-4 flex items-center gap-1 sm:gap-2 bg-orange-500 text-white px-2 sm:px-4 py-1 sm:py-2 rounded-lg hover:bg-orange-600 transition duration-300 disabled:bg-gray-600 text-xs sm:text-sm"
                onClick={handleAnalyze}
                disabled={loading}
              >
                <Code className="w-3 h-3 sm:w-4 sm:h-4" />
                {loading ? "Analyzing..." : "Analyze Code"}
              </button>
            </div>

            {analysis && !analysis.error && (
              <Tabs defaultValue="complexity" className="w-full">
                <TabsList className="grid grid-cols-2 sm:grid-cols-4 gap-1 sm:gap-2 bg-gray-900 p-1">
                  <TabsTrigger
                    value="complexity"
                    className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm"
                  >
                    <Timer className="w-4 h-4" />
                    Complexity
                  </TabsTrigger>
                  <TabsTrigger
                    value="quality"
                    className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm"
                  >
                    <CheckCircle className="w-4 h-4" />
                    Code Quality
                  </TabsTrigger>
                  <TabsTrigger
                    value="optimization"
                    className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm"
                  >
                    <Cpu className="w-4 h-4" />
                    Optimization
                  </TabsTrigger>
                  <TabsTrigger
                    value="patterns"
                    className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm"
                  >
                    <GitBranch className="w-4 h-4" />
                    Patterns
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="complexity" className="mt-2 sm:mt-4">
                  <div className="space-y-2 sm:space-y-4">
                    <div className="flex flex-col sm:flex-row gap-2 sm:gap-4">
                      <div className="flex-1 p-2 sm:p-4 bg-gray-900 rounded-lg">
                        <h3 className="text-xs sm:text-sm font-medium mb-1 sm:mb-2">
                          Time Complexity
                        </h3>
                        <p className="text-xl sm:text-2xl font-bold text-orange-400">
                          {analysis.complexity.time}
                        </p>
                      </div>
                      <div className="flex-1 p-2 sm:p-4 bg-gray-900 rounded-lg">
                        <h3 className="text-xs sm:text-sm font-medium mb-1 sm:mb-2">
                          Space Complexity
                        </h3>
                        <p className="text-xl sm:text-2xl font-bold text-orange-400">
                          {analysis.complexity.space}
                        </p>
                      </div>
                    </div>
                    <div className="p-2 sm:p-4 bg-gray-900 rounded-lg">
                      <h3 className="text-xs sm:text-sm font-medium mb-1 sm:mb-2">
                        Explanation
                      </h3>
                      <p className="text-xs sm:text-sm text-gray-300">
                        {analysis.complexity.explanation}
                      </p>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="quality" className="mt-2 sm:mt-4">
                  <div className="space-y-2 sm:space-y-4">
                    <div className="p-2 sm:p-4 bg-gray-900 rounded-lg">
                      <h3 className="text-xs sm:text-sm font-medium mb-1 sm:mb-2">
                        Code Quality Score
                      </h3>
                      <QualityIndicator score={analysis.quality.score} />
                      <p className="mt-1 sm:mt-2 text-center text-xl sm:text-2xl font-bold text-orange-400">
                        {analysis.quality.score}/100
                      </p>
                    </div>
                    <div className="p-2 sm:p-4 bg-gray-900 rounded-lg">
                      <h3 className="text-xs sm:text-sm font-medium mb-1 sm:mb-2">
                        Issues and Suggestions
                      </h3>
                      <div className="space-y-1 sm:space-y-2">
                        {analysis.quality.issues.map((issue, index) => (
                          <IssueItem key={index} issue={issue} />
                        ))}
                      </div>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="optimization" className="mt-2 sm:mt-4">
                  <div className="p-2 sm:p-4 bg-gray-900 rounded-lg">
                    <h3 className="text-xs sm:text-sm font-medium mb-2 sm:mb-4">
                      Optimization Suggestions
                    </h3>
                    <div className="space-y-1 sm:space-y-2">
                      {analysis.optimization.map((suggestion, index) => (
                        <div
                          key={index}
                          className="flex items-center gap-1 sm:gap-2 p-1 sm:p-2 bg-gray-800 rounded-md"
                        >
                          <Cpu className="text-orange-400" size={16} />
                          <span className="text-xs sm:text-sm">
                            {suggestion}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="patterns" className="mt-2 sm:mt-4">
                  <div className="p-2 sm:p-4 bg-gray-900 rounded-lg">
                    <h3 className="text-xs sm:text-sm font-medium mb-2 sm:mb-4">
                      Detected Patterns
                    </h3>
                    <div className="space-y-1 sm:space-y-2">
                      {analysis.patterns.map((pattern, index) => (
                        <div
                          key={index}
                          className="flex items-center gap-1 sm:gap-2 p-1 sm:p-2 bg-gray-800 rounded-md"
                        >
                          <GitBranch className="text-orange-400" size={16} />
                          <span className="text-xs sm:text-sm">{pattern}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            )}

            {analysis?.error && (
              <div className="p-2 sm:p-4 bg-red-900/50 border border-red-700 rounded-lg text-red-200">
                <div className="flex items-center gap-1 sm:gap-2">
                  <AlertCircle className="text-red-400" size={16} />
                  <span className="text-xs sm:text-sm">{analysis.error}</span>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
export default CodeAnalyzer;
