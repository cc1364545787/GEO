'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  TrendingUp,
  TrendingDown,
  BarChart3,
  Calendar,
  Download,
  Eye,
  Target,
  ArrowUpRight,
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
  Legend,
  AreaChart,
  Area,
} from 'recharts';

const trendData = [
  { date: '02-01', before: 45, after: 45 },
  { date: '02-08', before: 48, after: 52 },
  { date: '02-15', before: 46, after: 58 },
  { date: '02-22', before: 50, after: 65 },
  { date: '03-01', before: 52, after: 72 },
  { date: '03-08', before: 55, after: 78 },
  { date: '03-15', before: 58, after: 85 },
];

const modelData = [
  { model: '豆包', before: 65, after: 89, change: '+37%' },
  { model: '文心一言', before: 58, after: 76, change: '+31%' },
  { model: 'Kimi', before: 42, after: 68, change: '+62%' },
  { model: '深度求索', before: 55, after: 72, change: '+31%' },
  { model: '元宝', before: 38, after: 54, change: '+42%' },
];

const dailyData = [
  { date: '03-09', queries: 234, indexed: 189, newContent: 12 },
  { date: '03-10', queries: 256, indexed: 201, newContent: 8 },
  { date: '03-11', queries: 289, indexed: 223, newContent: 15 },
  { date: '03-12', queries: 301, indexed: 245, newContent: 11 },
  { date: '03-13', queries: 312, indexed: 267, newContent: 9 },
  { date: '03-14', queries: 298, indexed: 258, newContent: 14 },
  { date: '03-15', queries: 345, indexed: 289, newContent: 16 },
];

export default function MeasurementPage() {
  return (
    <div className="p-6">
      {/* 页面标题 */}
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">效果衡量</h1>
          <p className="text-sm text-muted-foreground">
            优化前后的数据对比与趋势分析
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Select defaultValue="30d">
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7d">近7天</SelectItem>
              <SelectItem value="14d">近14天</SelectItem>
              <SelectItem value="30d">近30天</SelectItem>
              <SelectItem value="90d">近90天</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="sm" className="gap-2">
            <Download className="h-4 w-4" />
            导出报告
          </Button>
        </div>
      </div>

      {/* 核心指标卡片 */}
      <div className="mb-6 grid grid-cols-4 gap-4">
        {[
          {
            title: '曝光次数',
            before: '12,456',
            after: '18,923',
            change: '+52%',
            trend: 'up',
          },
          {
            title: '排名提升',
            before: '第8位',
            after: '第3位',
            change: '+5位',
            trend: 'up',
          },
          {
            title: '收录率',
            before: '45%',
            after: '78%',
            change: '+33%',
            trend: 'up',
          },
          {
            title: '内容数量',
            before: '156篇',
            after: '234篇',
            change: '+78篇',
            trend: 'up',
          },
        ].map((item) => (
          <Card key={item.title}>
            <CardContent className="p-4">
              <p className="text-sm text-muted-foreground">{item.title}</p>
              <div className="mt-2 flex items-end justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-muted-foreground">优化前:</span>
                    <span className="text-sm line-through">{item.before}</span>
                  </div>
                  <div className="mt-1 flex items-center gap-2">
                    <span className="text-xs text-muted-foreground">优化后:</span>
                    <span className="text-lg font-bold">{item.after}</span>
                  </div>
                </div>
                <div className="flex items-center gap-1 rounded-full bg-green-100 px-2 py-1 dark:bg-green-900/30">
                  <ArrowUpRight className="h-3 w-3 text-green-600" />
                  <span className="text-xs font-medium text-green-600">
                    {item.change}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* 图表区域 */}
      <div className="grid grid-cols-2 gap-6">
        {/* 趋势对比图 */}
        <Card className="col-span-2">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>曝光趋势对比</CardTitle>
                <CardDescription>优化前后的曝光指数变化趋势</CardDescription>
              </div>
              <Tabs defaultValue="line">
                <TabsList>
                  <TabsTrigger value="line">趋势图</TabsTrigger>
                  <TabsTrigger value="area">面积图</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
          </CardHeader>
          <CardContent>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={trendData}>
                  <defs>
                    <linearGradient id="colorBefore" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#94a3b8" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#94a3b8" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="colorAfter" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="date" className="text-xs" />
                  <YAxis className="text-xs" />
                  <Tooltip />
                  <Legend />
                  <Area
                    type="monotone"
                    dataKey="before"
                    name="优化前"
                    stroke="#94a3b8"
                    fillOpacity={1}
                    fill="url(#colorBefore)"
                  />
                  <Area
                    type="monotone"
                    dataKey="after"
                    name="优化后"
                    stroke="#3b82f6"
                    fillOpacity={1}
                    fill="url(#colorAfter)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* 各模型效果对比 */}
        <Card>
          <CardHeader>
            <CardTitle>各平台优化效果</CardTitle>
            <CardDescription>不同AI平台的优化前后对比</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={modelData} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis type="number" className="text-xs" />
                  <YAxis type="category" dataKey="model" className="text-xs" width={70} />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="before" name="优化前" fill="#94a3b8" radius={[0, 4, 4, 0]} />
                  <Bar dataKey="after" name="优化后" fill="#3b82f6" radius={[0, 4, 4, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* 每日过程监测 */}
        <Card>
          <CardHeader>
            <CardTitle>每日过程监测</CardTitle>
            <CardDescription>近7天的查询、收录、内容数据</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={dailyData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="date" className="text-xs" />
                  <YAxis className="text-xs" />
                  <Tooltip />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="queries"
                    name="查询次数"
                    stroke="#8b5cf6"
                    strokeWidth={2}
                    dot={false}
                  />
                  <Line
                    type="monotone"
                    dataKey="indexed"
                    name="收录次数"
                    stroke="#3b82f6"
                    strokeWidth={2}
                    dot={false}
                  />
                  <Line
                    type="monotone"
                    dataKey="newContent"
                    name="新增内容"
                    stroke="#10b981"
                    strokeWidth={2}
                    dot={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
