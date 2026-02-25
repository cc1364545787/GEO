'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Target,
  Sparkles,
  TrendingUp,
  FileText,
  CheckCircle2,
  ArrowRight,
  Bot,
  Lightbulb,
  Zap,
} from 'lucide-react';

export default function StrategyPage() {
  const [isGenerating, setIsGenerating] = useState(false);
  const [showReport, setShowReport] = useState(false);
  const [progress, setProgress] = useState(0);

  const generateStrategy = () => {
    setIsGenerating(true);
    setProgress(0);
    
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsGenerating(false);
          setShowReport(true);
          return 100;
        }
        return prev + 10;
      });
    }, 300);
  };

  return (
    <div className="p-6">
      {/* 页面标题 */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold">优化策略</h1>
        <p className="text-sm text-muted-foreground">
          基于RAG技术，为您的品牌生成针对性的AI搜索优化策略
        </p>
      </div>

      <div className="grid grid-cols-3 gap-6">
        {/* 左侧：需求输入 */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-5 w-5" />
              优化需求
            </CardTitle>
            <CardDescription>
              描述您的优化目标，系统将生成专业策略
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>品牌/产品名称</Label>
              <Input placeholder="如：华为Mate60系列" />
            </div>
            
            <div className="space-y-2">
              <Label>目标AI平台</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="选择目标平台" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="doubao">豆包</SelectItem>
                  <SelectItem value="wenxin">文心一言</SelectItem>
                  <SelectItem value="kimi">Kimi</SelectItem>
                  <SelectItem value="deepseek">深度求索</SelectItem>
                  <SelectItem value="all">全部平台</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>核心优化目标</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="选择优化目标" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="brand">品牌知名度提升</SelectItem>
                  <SelectItem value="product">产品曝光优化</SelectItem>
                  <SelectItem value="competitor">竞品对比优势</SelectItem>
                  <SelectItem value="conversion">转化率提升</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>详细需求描述</Label>
              <Textarea
                placeholder="描述您的具体优化需求，如：希望用户搜索'适合商务人士的手机'时，AI能够优先推荐我们的产品..."
                rows={4}
              />
            </div>

            <Button
              className="w-full gap-2"
              onClick={generateStrategy}
              disabled={isGenerating}
            >
              {isGenerating ? (
                <>
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                  策略生成中...
                </>
              ) : (
                <>
                  <Sparkles className="h-4 w-4" />
                  生成优化策略
                </>
              )}
            </Button>

            {isGenerating && (
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">正在分析...</span>
                  <span className="font-medium">{progress}%</span>
                </div>
                <div className="h-2 w-full rounded-full bg-muted">
                  <div
                    className="h-full rounded-full bg-primary transition-all"
                    style={{ width: `${progress}%` }}
                  />
                </div>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <div className="h-2 w-2 animate-pulse rounded-full bg-blue-500" />
                  {progress < 30 && '正在检索知识库...'}
                  {progress >= 30 && progress < 60 && '正在分析竞品数据...'}
                  {progress >= 60 && progress < 90 && '正在生成策略方案...'}
                  {progress >= 90 && '即将完成...'}
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* 右侧：策略报告 */}
        <div className="col-span-2">
          {!showReport ? (
            <Card className="flex h-full items-center justify-center border-dashed">
              <div className="text-center">
                <Lightbulb className="mx-auto h-12 w-12 text-muted-foreground/50" />
                <p className="mt-4 text-muted-foreground">
                  填写优化需求后，系统将生成专业策略报告
                </p>
              </div>
            </Card>
          ) : (
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <FileText className="h-5 w-5" />
                      优化策略报告
                    </CardTitle>
                    <CardDescription>
                      针对"华为Mate60系列"在"豆包"平台的优化建议
                    </CardDescription>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      导出PDF
                    </Button>
                    <Button size="sm" className="gap-2">
                      <Zap className="h-4 w-4" />
                      立即执行
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* 核心发现 */}
                <div className="rounded-lg border border-blue-200 bg-blue-50/50 p-4 dark:border-blue-900 dark:bg-blue-950/30">
                  <h3 className="flex items-center gap-2 font-semibold text-blue-700 dark:text-blue-400">
                    <Lightbulb className="h-4 w-4" />
                    核心发现
                  </h3>
                  <ul className="mt-3 space-y-2 text-sm">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 text-blue-500" />
                      <span>当前品牌在"商务手机推荐"类问题中排名第3位，有较大提升空间</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 text-blue-500" />
                      <span>竞品小米14在"性价比"话题中占据优势，建议针对性优化</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 text-blue-500" />
                      <span>官方渠道内容被引用率仅23%，需加强权威内容建设</span>
                    </li>
                  </ul>
                </div>

                {/* 优化建议 */}
                <div>
                  <h3 className="mb-3 font-semibold">优化建议</h3>
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      {
                        title: '内容策略',
                        icon: FileText,
                        items: [
                          '增加"商务场景"相关内容输出',
                          '强化"安全性能"卖点曝光',
                          '补充"售后服务"相关信息',
                        ],
                      },
                      {
                        title: '渠道优化',
                        icon: Target,
                        items: [
                          '提升知乎专栏文章数量',
                          '增加小红书种草内容',
                          '优化官网结构化数据',
                        ],
                      },
                      {
                        title: '关键词布局',
                        icon: TrendingUp,
                        items: [
                          '重点覆盖"商务手机推荐"',
                          '拓展"安全手机"相关搜索',
                          '布局"国产高端手机"',
                        ],
                      },
                      {
                        title: '执行优先级',
                        icon: Zap,
                        items: [
                          '第1周：完成10篇核心文章',
                          '第2周：发布至知乎、小红书',
                          '第3周：启动收录监测',
                        ],
                      },
                    ].map((section) => (
                      <div key={section.title} className="rounded-lg border p-3">
                        <div className="flex items-center gap-2 mb-2">
                          <section.icon className="h-4 w-4 text-primary" />
                          <span className="font-medium">{section.title}</span>
                        </div>
                        <ul className="space-y-1 text-xs text-muted-foreground">
                          {section.items.map((item, idx) => (
                            <li key={idx} className="flex items-start gap-1">
                              <span className="text-primary">•</span>
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 预期效果 */}
                <div className="rounded-lg bg-gradient-to-r from-green-50 to-blue-50 p-4 dark:from-green-950/30 dark:to-blue-950/30">
                  <h3 className="font-semibold">预期效果</h3>
                  <div className="mt-3 grid grid-cols-3 gap-4">
                    <div className="text-center">
                      <p className="text-3xl font-bold text-green-600">+35%</p>
                      <p className="text-xs text-muted-foreground">曝光量提升</p>
                    </div>
                    <div className="text-center">
                      <p className="text-3xl font-bold text-blue-600">Top 3</p>
                      <p className="text-xs text-muted-foreground">目标排名</p>
                    </div>
                    <div className="text-center">
                      <p className="text-3xl font-bold text-purple-600">21天</p>
                      <p className="text-xs text-muted-foreground">预计周期</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
