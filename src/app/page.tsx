'use client';

import { Fragment } from 'react'; // 方案A：引入它
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  FileText,
  TrendingUp,
  Eye,
  Target,
  ArrowRight,
  CheckCircle2,
  Clock,
  Zap,
  Globe,
  Bot,
  MessageSquare,
  Send,
  BarChart3,
  Sparkles,
  ChevronRight,
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
  AreaChart,
  Area,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
} from 'recharts';

// 模拟数据
const stats = [
  {
    title: '累计生成问题',
    value: '1,234',
    change: '+156',
    icon: MessageSquare,
    color: 'text-blue-500',
    bgColor: 'bg-blue-500/10',
  },
  {
    title: '累计生成文章',
    value: '856',
    change: '+89',
    icon: FileText,
    color: 'text-green-500',
    bgColor: 'bg-green-500/10',
  },
  {
    title: '累计发布量',
    value: '2,456',
    change: '+234',
    icon: Send,
    color: 'text-purple-500',
    bgColor: 'bg-purple-500/10',
  },
  {
    title: 'AI收录总数',
    value: '1,892',
    change: '+312',
    icon: Eye,
    color: 'text-orange-500',
    bgColor: 'bg-orange-500/10',
  },
];

const workflowSteps = [
  { title: '添加产品', status: 'completed', icon: Target },
  { title: '添加素材', status: 'in_progress', icon: FileText },
  { title: '生成问题', status: 'pending', icon: MessageSquare },
  { title: '创建提示词', status: 'pending', icon: Sparkles },
  { title: '生成文章', status: 'pending', icon: FileText },
  { title: '授权', status: 'pending', icon: Globe },
  { title: '发布', status: 'pending', icon: Send },
  { title: '收录查询', status: 'pending', icon: Eye },
];

const radarData = [
  { model: '文心一言', score: 85, fullMark: 100 },
  { model: 'Kimi', score: 78, fullMark: 100 },
  { model: '豆包', score: 92, fullMark: 100 },
  { model: 'ChatGPT', score: 65, fullMark: 100 },
  { model: '深度求索', score: 88, fullMark: 100 },
  { model: '元宝', score: 72, fullMark: 100 },
  { model: '千问', score: 81, fullMark: 100 },
  { model: '智谱清言', score: 76, fullMark: 100 },
];

const trendData = [
  { date: '03-01', articles: 45, published: 60, indexed: 32 },
  { date: '03-02', articles: 52, published: 55, indexed: 45 },
  { date: '03-03', articles: 48, published: 72, indexed: 56 },
  { date: '03-04', articles: 61, published: 65, indexed: 48 },
  { date: '03-05', articles: 55, published: 80, indexed: 62 },
  { date: '03-06', articles: 67, published: 75, indexed: 71 },
  { date: '03-07', articles: 72, published: 88, indexed: 78 },
];

const recentTasks = [
  {
    id: 1,
    title: '品牌关键词优化方案',
    status: 'running',
    progress: 67,
    model: '豆包',
  },
  {
    id: 2,
    title: '竞品洞察分析报告',
    status: 'completed',
    progress: 100,
    model: '文心一言',
  },
  {
    id: 3,
    title: '新品发布软文生成',
    status: 'pending',
    progress: 0,
    model: 'Kimi',
  },
];

const modelExposure = [
  { name: '豆包', exposure: 1245, trend: 'up', change: '+23%' },
  { name: '文心一言', exposure: 1089, trend: 'up', change: '+15%' },
  { name: 'Kimi', exposure: 987, trend: 'down', change: '-5%' },
  { name: '深度求索', exposure: 876, trend: 'up', change: '+18%' },
  { name: '元宝', exposure: 654, trend: 'up', change: '+8%' },
];

export default function DashboardPage() {
  return (
    <div className="p-6">
      {/* 页面标题 */}
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">工作台</h1>
          <p className="text-sm text-muted-foreground">
            欢迎回来，这是您的品牌在AI时代的曝光优化中心
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            导出报告
          </Button>
          <Button size="sm" className="gap-2">
            <Sparkles className="h-4 w-4" />
            开始优化
          </Button>
        </div>
      </div>

      {/* 快速上手向导 */}
{/* 快速上手向导 - 修复 Fragment 和自适应 */}
<Card className="mb-6 border-l-4 border-l-blue-500 bg-gradient-to-r from-blue-50/50 to-purple-50/50 dark:from-blue-950/30 dark:to-purple-950/30 min-w-0">
  <CardHeader className="pb-3">
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2">
        <Zap className="h-5 w-5 text-blue-500" />
        <CardTitle className="text-base">快速上手向导</CardTitle>
      </div>
      <Badge variant="secondary" className="whitespace-nowrap">进行中 (1/8)</Badge>
    </div>
    <CardDescription>
      按照以下步骤完成您的第一次GEO优化，预计需要10分钟
    </CardDescription>
  </CardHeader>
  
  <CardContent>
    <div className="flex items-center justify-between w-full gap-0 overflow-x-auto pb-4 no-scrollbar">
      {workflowSteps.map((step, index) => (
        // 使用简写 Fragment <> 解决 React 变量报错
        <Fragment key={step.title}>
          <div className="flex flex-col items-center gap-2 shrink-0">
            <div
              className={`flex h-10 w-10 items-center justify-center rounded-full border-2 transition-all ${
                step.status === 'completed'
                  ? 'border-green-500 bg-green-500 text-white'
                  : step.status === 'in_progress'
                  ? 'border-blue-500 bg-blue-500 text-white shadow-[0_0_10px_rgba(59,130,246,0.5)]'
                  : 'border-muted-foreground/30 bg-background'
              }`}
            >
              {step.status === 'completed' ? (
                <CheckCircle2 className="h-5 w-5" />
              ) : (
                <step.icon className={`h-5 w-5 ${step.status === 'in_progress' ? '' : 'text-muted-foreground'}`} />
              )}
            </div>
            <span className={`text-[10px] md:text-xs font-medium whitespace-nowrap ${
              step.status === 'in_progress' ? 'text-blue-500' : 'text-muted-foreground'
            }`}>
              {step.title}
            </span>
          </div>

          {index < workflowSteps.length - 1 && (
            <div className="flex-1 px-2 mb-6"> {/* 保持线在圆形中间 */}
              <div className={`h-[2px] w-full min-w-[15px] ${
                step.status === 'completed' ? 'bg-green-500' : 'bg-muted-foreground/30'
              }`} />
            </div>
          )}
        </Fragment>
      ))}
    </div>

    <div className="mt-4 flex justify-end">
      <Button size="sm" className="gap-2">
        继续下一步
        <ArrowRight className="h-4 w-4" />
      </Button>
    </div>
  </CardContent>
</Card>
      {/* 数据统计卡片 */}
      <div className="mb-6 grid grid-cols-4 gap-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.title} className="relative overflow-hidden">
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">{stat.title}</p>
                    <p className="mt-1 text-2xl font-bold">{stat.value}</p>
                    <div className="mt-2 flex items-center gap-1">
                      <TrendingUp className="h-3 w-3 text-green-500" />
                      <span className="text-xs text-green-500">{stat.change}</span>
                      <span className="text-xs text-muted-foreground">本月</span>
                    </div>
                  </div>
                  <div className={`rounded-lg p-2 ${stat.bgColor}`}>
                    <Icon className={`h-5 w-5 ${stat.color}`} />
                  </div>
                </div>
                {/* 装饰性渐变 */}
                <div className="absolute -right-4 -top-4 h-24 w-24 rounded-full bg-gradient-to-br from-blue-500/5 to-purple-500/5" />
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* 主要内容区 */}
      <div className="grid grid-cols-3 gap-6">
        {/* 左侧：多模型收录雷达墙 */}
        <Card className="col-span-2">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>多模型收录雷达墙</CardTitle>
                <CardDescription>品牌在各主流AI平台的曝光分析</CardDescription>
              </div>
              <Tabs defaultValue="radar">
                <TabsList>
                  <TabsTrigger value="radar">雷达图</TabsTrigger>
                  <TabsTrigger value="trend">趋势图</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart cx="50%" cy="50%" outerRadius="80%" data={radarData}>
                  <PolarGrid stroke="hsl(var(--border))" />
                  <PolarAngleAxis dataKey="model" className="text-xs" />
                  <PolarRadiusAxis angle={30} domain={[0, 100]} />
                  <Radar
                    name="收录得分"
                    dataKey="score"
                    stroke="hsl(var(--primary))"
                    fill="oklch(62.3% 0.214 259.815)"
                    fillOpacity={0.4}
                  />
                </RadarChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-4 grid grid-cols-4 gap-2">
              {radarData.slice(0, 4).map((item) => (
                <div
                  key={item.model}
                  className="flex items-center justify-between rounded-lg border p-2"
                >
                  <span className="text-xs font-medium">{item.model}</span>
                  <Badge variant={item.score > 80 ? 'default' : 'secondary'}>
                    {item.score}分
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* 右侧：模型曝光排名 */}
        <Card>
          <CardHeader>
            <CardTitle>模型曝光排名</CardTitle>
            <CardDescription>各AI平台品牌提及次数</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {modelExposure.map((item, index) => (
                <div
                  key={item.name}
                  className="flex items-center justify-between rounded-lg border p-3 transition-colors hover:bg-muted/50"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-purple-500 text-xs font-bold text-white">
                      {index + 1}
                    </div>
                    <div>
                      <p className="text-sm font-medium">{item.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {item.exposure.toLocaleString()} 次曝光
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    <ArrowUpRight
                      className={`h-3 w-3 ${
                        item.trend === 'up' ? 'text-green-500' : 'rotate-180 text-red-500'
                      }`}
                    />
                    <span
                      className={`text-xs font-medium ${
                        item.trend === 'up' ? 'text-green-500' : 'text-red-500'
                      }`}
                    >
                      {item.change}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* 底部区域 */}
      <div className="mt-6 grid grid-cols-3 gap-6">
        {/* 趋势图 */}
        <Card className="col-span-2">
          <CardHeader>
            <CardTitle>收录趋势</CardTitle>
            <CardDescription>近7天的文章生成、发布与收录数据</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={trendData}>
                  <defs>
                    <linearGradient id="colorIndexed" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="oklch(62.3% 0.214 259.815)" stopOpacity={0.6} />
                      <stop offset="95%" stopColor="oklch(62.3% 0.214 259.815)" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="date" className="text-xs" />
                  <YAxis className="text-xs" />
                  <Tooltip />
                  <Area
                    type="monotone"
                    dataKey="indexed"
                    stroke="hsl(var(--primary))"
                    fillOpacity={1}
                    fill="url(#colorIndexed)"
                    name="AI收录"
                  />
                  <Line
                    type="monotone"
                    dataKey="published"
                    stroke="#82ca9d"
                    strokeWidth={2}
                    dot={false}
                    name="发布量"
                  />
                  <Line
                    type="monotone"
                    dataKey="articles"
                    stroke="#8884d8"
                    strokeWidth={2}
                    dot={false}
                    name="文章数"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* 最近任务 */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>最近任务</CardTitle>
              <Button variant="ghost" size="sm" className="text-xs">
                查看全部
                <ChevronRight className="ml-1 h-3 w-3" />
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentTasks.map((task) => (
                <div
                  key={task.id}
                  className="rounded-lg border p-3 transition-colors hover:bg-muted/50"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-sm font-medium">{task.title}</p>
                      <div className="mt-1 flex items-center gap-2">
                        <Badge variant="outline" className="text-xs">
                          <Bot className="mr-1 h-3 w-3" />
                          {task.model}
                        </Badge>
                        {task.status === 'running' && (
                          <Badge variant="secondary" className="text-xs">
                            <Clock className="mr-1 h-3 w-3" />
                            进行中
                          </Badge>
                        )}
                        {task.status === 'completed' && (
                          <Badge variant="default" className="text-xs bg-green-500">
                            <CheckCircle2 className="mr-1 h-3 w-3" />
                            已完成
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>
                  {task.status === 'running' && (
                    <div className="mt-3">
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-muted-foreground">进度</span>
                        <span className="font-medium">{task.progress}%</span>
                      </div>
                      <Progress value={task.progress} className="mt-1 h-1.5" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
