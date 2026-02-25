'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Globe,
  TrendingUp,
  Eye,
  CheckCircle2,
  AlertTriangle,
  ExternalLink,
  Sparkles,
} from 'lucide-react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from 'recharts';

const trackingData = [
  { date: '03-09', indexed: 23, queries: 45 },
  { date: '03-10', indexed: 28, queries: 52 },
  { date: '03-11', indexed: 35, queries: 61 },
  { date: '03-12', indexed: 42, queries: 58 },
  { date: '03-13', indexed: 48, queries: 67 },
  { date: '03-14', indexed: 55, queries: 72 },
  { date: '03-15', indexed: 62, queries: 78 },
];

const citationSources = [
  { source: '官网', count: 234, trend: '+15%', score: 85 },
  { source: '知乎专栏', count: 156, trend: '+22%', score: 78 },
  { source: '微信公众号', count: 123, trend: '+8%', score: 72 },
  { source: '小红书', count: 89, trend: '+35%', score: 65 },
  { source: '微博', count: 67, trend: '-5%', score: 58 },
];

const aiModels = [
  { name: '豆包', indexed: 89, score: 92, status: 'good' },
  { name: '文心一言', indexed: 76, score: 85, status: 'good' },
  { name: 'Kimi', indexed: 68, score: 78, status: 'warning' },
  { name: '深度求索', indexed: 72, score: 81, status: 'good' },
  { name: '元宝', indexed: 54, score: 68, status: 'warning' },
  { name: 'ChatGPT', indexed: 23, score: 45, status: 'error' },
];

export default function TrackingPage() {
  return (
    <div className="p-6">
      {/* 页面标题 */}
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">AI 收录追踪</h1>
          <p className="text-sm text-muted-foreground">
            监测官网、官方店铺是否被AI顺畅引用，给出得分及优化建议
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Select defaultValue="30d">
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7d">近7天</SelectItem>
              <SelectItem value="14d">近14天</SelectItem>
              <SelectItem value="30d">近30天</SelectItem>
            </SelectContent>
          </Select>
          <Button className="gap-2">
            <Sparkles className="h-4 w-4" />
            生成报告
          </Button>
        </div>
      </div>

      {/* 核心指标 */}
      <div className="mb-6 grid grid-cols-4 gap-4">
        {[
          { title: '总收录数', value: '1,892', change: '+312', trend: 'up' },
          { title: '引用来源数', value: '5', change: '+1', trend: 'up' },
          { title: '平均GEO得分', value: '76.5', change: '+5.3', trend: 'up' },
          { title: 'AI友好度', value: '良好', change: '↑', trend: 'up' },
        ].map((stat) => (
          <Card key={stat.title}>
            <CardContent className="p-4">
              <p className="text-sm text-muted-foreground">{stat.title}</p>
              <p className="mt-1 text-2xl font-bold">{stat.value}</p>
              <div className="mt-1 flex items-center gap-1">
                <TrendingUp className="h-3 w-3 text-green-500" />
                <span className="text-xs text-green-500">{stat.change}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-3 gap-6">
        {/* 收录趋势图 */}
        <Card className="col-span-2">
          <CardHeader>
            <CardTitle>收录趋势</CardTitle>
            <CardDescription>近7天的AI收录数量变化</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={trackingData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="date" className="text-xs" />
                  <YAxis className="text-xs" />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="indexed"
                    name="收录数"
                    stroke="hsl(var(--primary))"
                    strokeWidth={2}
                  />
                  <Line
                    type="monotone"
                    dataKey="queries"
                    name="查询数"
                    stroke="#10b981"
                    strokeWidth={2}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* AI平台收录状态 */}
        <Card>
          <CardHeader>
            <CardTitle>各平台收录状态</CardTitle>
            <CardDescription>在不同AI平台的收录情况</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {aiModels.map((model) => (
                <div
                  key={model.name}
                  className="flex items-center justify-between rounded-lg border p-3"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`h-2 w-2 rounded-full ${
                        model.status === 'good'
                          ? 'bg-green-500'
                          : model.status === 'warning'
                          ? 'bg-orange-500'
                          : 'bg-red-500'
                      }`}
                    />
                    <span className="font-medium">{model.name}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm">{model.indexed}次</span>
                    <Badge
                      variant={
                        model.score >= 80
                          ? 'default'
                          : model.score >= 60
                          ? 'secondary'
                          : 'destructive'
                      }
                      className={`text-xs ${model.score >= 80 ? 'bg-green-500' : ''}`}
                    >
                      {model.score}分
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* 引用来源分析 */}
      <Card className="mt-6">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>引用来源分析</CardTitle>
              <CardDescription>AI回答中引用的品牌相关来源统计</CardDescription>
            </div>
            <Tabs defaultValue="list">
              <TabsList>
                <TabsTrigger value="list">列表视图</TabsTrigger>
                <TabsTrigger value="chart">图表视图</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-5 gap-4">
            {citationSources.map((source) => (
              <div
                key={source.source}
                className="rounded-lg border p-4 transition-colors hover:bg-muted/50"
              >
                <div className="flex items-center justify-between">
                  <Globe className="h-4 w-4 text-muted-foreground" />
                  <Badge
                    variant={source.trend.startsWith('+') ? 'default' : 'destructive'}
                    className={`text-xs ${source.trend.startsWith('+') ? 'bg-green-500' : ''}`}
                  >
                    {source.trend}
                  </Badge>
                </div>
                <p className="mt-3 font-semibold">{source.source}</p>
                <p className="text-2xl font-bold">{source.count}</p>
                <div className="mt-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-muted-foreground">GEO得分</span>
                    <span className="font-medium">{source.score}</span>
                  </div>
                  <Progress value={source.score} className="mt-1 h-1.5" />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* 优化建议 */}
      <Card className="mt-6 border-l-4 border-l-green-500 bg-gradient-to-r from-green-50/50 to-blue-50/50 dark:from-green-950/30 dark:to-blue-950/30">
        <CardContent className="p-4">
          <div className="flex items-start gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-500/10">
              <Sparkles className="h-5 w-5 text-green-500" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold">优化建议</h3>
              <div className="mt-3 space-y-2">
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 text-green-500" />
                  <p className="text-sm">
                    <strong>官网结构化数据优化：</strong>建议添加Schema.org标记，
                    提升AI对产品信息的识别率。预计可提升收录率20%。
                  </p>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 text-green-500" />
                  <p className="text-sm">
                    <strong>ChatGPT收录不足：</strong>当前ChatGPT收录得分较低，
                    建议增加英文内容输出，覆盖国际用户群体。
                  </p>
                </div>
              </div>
              <Button variant="outline" size="sm" className="mt-3 gap-2">
                查看详细建议
                <ExternalLink className="h-3 w-3" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
