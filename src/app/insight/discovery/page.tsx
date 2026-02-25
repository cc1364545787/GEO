'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import {
  Search,
  Sparkles,
  TrendingUp,
  Users,
  Target,
  BarChart3,
  Lightbulb,
  ArrowRight,
  Bot,
  Globe,
  FileText,
  Eye,
} from 'lucide-react';

const aiPlatforms = [
  { id: 'wenxin', name: '文心一言', icon: '🤖', selected: true },
  { id: 'kimi', name: 'Kimi', icon: '💬', selected: true },
  { id: 'doubao', name: '豆包', icon: '🎵', selected: true },
  { id: 'chatgpt', name: 'ChatGPT', icon: '🌐', selected: false },
  { id: 'deepseek', name: '深度求索', icon: '🔬', selected: true },
  { id: 'yuanbao', name: '元宝', icon: '💎', selected: false },
  { id: 'qianwen', name: '千问', icon: '❓', selected: true },
  { id: 'zhipu', name: '智谱清言', icon: '📚', selected: false },
];

export default function DiscoveryPage() {
  const [brandName, setBrandName] = useState('');
  const [platforms, setPlatforms] = useState(aiPlatforms);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [showResults, setShowResults] = useState(false);

  const togglePlatform = (id: string) => {
    setPlatforms(
      platforms.map((p) => (p.id === id ? { ...p, selected: !p.selected } : p))
    );
  };

  const startAnalysis = () => {
    setIsAnalyzing(true);
    setTimeout(() => {
      setIsAnalyzing(false);
      setShowResults(true);
    }, 2000);
  };

  return (
    <div className="p-6">
      {/* 页面标题 */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold">多维洞察</h1>
        <p className="text-sm text-muted-foreground">
          输入品牌名称，一键分析品牌在主流AI平台的曝光情况
        </p>
      </div>

      <div className="grid grid-cols-3 gap-6">
        {/* 左侧：输入配置 */}
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Search className="h-5 w-5" />
              品牌洞察分析
            </CardTitle>
            <CardDescription>
              配置分析参数，开始洞察之旅
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* 品牌名称 */}
            <div className="space-y-2">
              <Label htmlFor="brand">品牌名称</Label>
              <Input
                id="brand"
                placeholder="请输入品牌名称，如：华为"
                value={brandName}
                onChange={(e) => setBrandName(e.target.value)}
              />
            </div>

            {/* AI平台选择 */}
            <div className="space-y-3">
              <Label>选择分析的AI平台</Label>
              <div className="grid grid-cols-2 gap-2">
                {platforms.map((platform) => (
                  <div
                    key={platform.id}
                    className={`flex items-center gap-2 rounded-lg border p-2 cursor-pointer transition-colors ${
                      platform.selected
                        ? 'border-primary bg-primary/5'
                        : 'hover:bg-muted/50'
                    }`}
                    onClick={() => togglePlatform(platform.id)}
                  >
                    <Checkbox
                      checked={platform.selected}
                      onChange={() => togglePlatform(platform.id)}
                    />
                    <span className="text-lg">{platform.icon}</span>
                    <span className="text-sm">{platform.name}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* 分析按钮 */}
            <Button
              className="w-full gap-2"
              onClick={startAnalysis}
              disabled={!brandName || isAnalyzing}
            >
              {isAnalyzing ? (
                <>
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                  分析中...
                </>
              ) : (
                <>
                  <Sparkles className="h-4 w-4" />
                  开始洞察分析
                </>
              )}
            </Button>
          </CardContent>
        </Card>

        {/* 右侧：分析结果 */}
        <div className="col-span-2 space-y-6">
          {!showResults ? (
            <Card className="flex h-96 items-center justify-center border-dashed">
              <div className="text-center">
                <Lightbulb className="mx-auto h-12 w-12 text-muted-foreground/50" />
                <p className="mt-4 text-muted-foreground">
                  输入品牌名称并选择AI平台，开始洞察分析
                </p>
              </div>
            </Card>
          ) : (
            <>
              {/* 用户画像匹配度 */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="h-5 w-5" />
                    用户画像匹配度分析
                  </CardTitle>
                  <CardDescription>
                    基于AI平台的用户群体特征分析
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="rounded-lg border p-4">
                      <div className="flex items-center gap-2">
                        <div className="h-2 w-2 animate-pulse rounded-full bg-green-500" />
                        <span className="text-sm font-medium">高价值人群</span>
                      </div>
                      <p className="mt-2 text-2xl font-bold text-green-500">68%</p>
                      <p className="text-xs text-muted-foreground">
                        25-40岁一线城市白领
                      </p>
                    </div>
                    <div className="rounded-lg border p-4">
                      <div className="flex items-center gap-2">
                        <div className="h-2 w-2 animate-pulse rounded-full bg-blue-500" />
                        <span className="text-sm font-medium">潜在用户</span>
                      </div>
                      <p className="mt-2 text-2xl font-bold text-blue-500">24%</p>
                      <p className="text-xs text-muted-foreground">
                        18-25岁学生群体
                      </p>
                    </div>
                    <div className="rounded-lg border p-4">
                      <div className="flex items-center gap-2">
                        <div className="h-2 w-2 animate-pulse rounded-full bg-orange-500" />
                        <span className="text-sm font-medium">待开发</span>
                      </div>
                      <p className="mt-2 text-2xl font-bold text-orange-500">8%</p>
                      <p className="text-xs text-muted-foreground">
                        40岁以上用户群体
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* 行业词可见度 */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Eye className="h-5 w-5" />
                    行业词可见度分析
                  </CardTitle>
                  <CardDescription>
                    核心关键词在AI平台中的曝光排名
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {[
                      { keyword: '华为手机', rank: 1, change: '+2', visibility: 92 },
                      { keyword: '华为笔记本', rank: 3, change: '+1', visibility: 78 },
                      { keyword: '华为手表', rank: 5, change: '-1', visibility: 65 },
                      { keyword: '华为耳机', rank: 2, change: '+3', visibility: 88 },
                      { keyword: '华为平板', rank: 4, change: '0', visibility: 72 },
                    ].map((item) => (
                      <div
                        key={item.keyword}
                        className="flex items-center justify-between rounded-lg border p-3"
                      >
                        <div className="flex items-center gap-3">
                          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-sm font-bold text-primary">
                            {item.rank}
                          </div>
                          <div>
                            <p className="font-medium">{item.keyword}</p>
                            <div className="flex items-center gap-1 text-xs">
                              <TrendingUp
                                className={`h-3 w-3 ${
                                  item.change.startsWith('+')
                                    ? 'text-green-500'
                                    : item.change === '0'
                                    ? 'text-gray-500'
                                    : 'rotate-180 text-red-500'
                                }`}
                              />
                              <span
                                className={
                                  item.change.startsWith('+')
                                    ? 'text-green-500'
                                    : item.change === '0'
                                    ? 'text-gray-500'
                                    : 'text-red-500'
                                }
                              >
                                {item.change}
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="w-32">
                            <Progress value={item.visibility} className="h-2" />
                          </div>
                          <span className="text-sm font-medium">
                            {item.visibility}%
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* 媒体引用清单 */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Globe className="h-5 w-5" />
                    媒体引用清单
                  </CardTitle>
                  <CardDescription>
                    AI回答中引用的品牌相关媒体来源
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      { name: '官网', count: 234, trend: '+15%' },
                      { name: '官方公众号', count: 156, trend: '+8%' },
                      { name: '知乎专栏', count: 89, trend: '+22%' },
                      { name: '微博', count: 67, trend: '-5%' },
                    ].map((item) => (
                      <div
                        key={item.name}
                        className="flex items-center justify-between rounded-lg border p-3"
                      >
                        <div className="flex items-center gap-2">
                          <FileText className="h-4 w-4 text-muted-foreground" />
                          <span className="font-medium">{item.name}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-lg font-bold">{item.count}</span>
                          <Badge
                            variant={
                              item.trend.startsWith('+') ? 'default' : 'destructive'
                            }
                            className="text-xs"
                          >
                            {item.trend}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
