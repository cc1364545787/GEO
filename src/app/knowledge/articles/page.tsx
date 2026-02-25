'use client';

import { useState } from 'react';
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
  Sparkles,
  FileText,
  Send,
  Eye,
  Clock,
  CheckCircle2,
  MoreHorizontal,
  Edit,
  Trash2,
  RefreshCw,
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Progress } from '@/components/ui/progress';

const articles = [
  {
    id: 1,
    title: '华为Mate60 Pro：商务人士的最佳选择',
    status: 'published',
    platform: '知乎',
    views: 2345,
    publishTime: '2024-03-15',
    progress: 100,
  },
  {
    id: 2,
    title: '卫星通话技术：华为Mate60的创新突破',
    status: 'draft',
    platform: '-',
    views: 0,
    publishTime: '-',
    progress: 80,
  },
  {
    id: 3,
    title: '2024年旗舰手机对比：华为vs小米vs苹果',
    status: 'generating',
    platform: '-',
    views: 0,
    publishTime: '-',
    progress: 45,
  },
  {
    id: 4,
    title: '鸿蒙系统深度体验：流畅度超乎想象',
    status: 'published',
    platform: '小红书',
    views: 1892,
    publishTime: '2024-03-14',
    progress: 100,
  },
  {
    id: 5,
    title: '华为手机续航实测：一天一充足够吗？',
    status: 'published',
    platform: '微信公众号',
    views: 3456,
    publishTime: '2024-03-13',
    progress: 100,
  },
];

const templates = [
  { id: 1, name: '产品评测', description: '深度产品体验评测' },
  { id: 2, name: '对比分析', description: '与竞品的详细对比' },
  { id: 3, name: '使用技巧', description: '实用的使用技巧分享' },
  { id: 4, name: '新品发布', description: '新品发布宣传文案' },
  { id: 5, name: '用户故事', description: '真实用户使用体验' },
];

export default function ArticlesPage() {
  const [isGenerating, setIsGenerating] = useState(false);

  return (
    <div className="p-6">
      {/* 页面标题 */}
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">文章生成</h1>
          <p className="text-sm text-muted-foreground">
            基于预设模板和知识库，一键批量生成高质量软文
          </p>
        </div>
        <Button className="gap-2" onClick={() => setIsGenerating(true)}>
          <Sparkles className="h-4 w-4" />
          批量生成文章
        </Button>
      </div>

      <div className="grid grid-cols-4 gap-6">
        {/* 左侧：配置 */}
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle className="text-base">生成配置</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">选择产品</label>
              <Select defaultValue="mate60">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="mate60">华为Mate60 Pro</SelectItem>
                  <SelectItem value="matepad">华为MatePad Pro</SelectItem>
                  <SelectItem value="watch">华为Watch GT4</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">文章模板</label>
              <Select defaultValue="review">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {templates.map((t) => (
                    <SelectItem key={t.id} value={t.id.toString()}>
                      {t.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">营销阶段</label>
              <Select defaultValue="awareness">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="awareness">认知阶段</SelectItem>
                  <SelectItem value="interest">兴趣阶段</SelectItem>
                  <SelectItem value="decision">决策阶段</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">生成数量</label>
              <Select defaultValue="5">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">1 篇</SelectItem>
                  <SelectItem value="5">5 篇</SelectItem>
                  <SelectItem value="10">10 篇</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Button className="w-full gap-2">
              <Sparkles className="h-4 w-4" />
              开始生成
            </Button>
          </CardContent>
        </Card>

        {/* 右侧：文章列表 */}
        <Card className="col-span-3">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>文章列表</CardTitle>
                <CardDescription>管理已生成和已发布的文章</CardDescription>
              </div>
              <Tabs defaultValue="all">
                <TabsList>
                  <TabsTrigger value="all">全部</TabsTrigger>
                  <TabsTrigger value="generating">生成中</TabsTrigger>
                  <TabsTrigger value="draft">草稿</TabsTrigger>
                  <TabsTrigger value="published">已发布</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {articles.map((article) => (
                <div
                  key={article.id}
                  className="flex items-center justify-between rounded-lg border p-4 transition-colors hover:bg-muted/50"
                >
                  <div className="flex items-center gap-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                      <FileText className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium">{article.title}</p>
                      <div className="flex items-center gap-3 text-xs text-muted-foreground">
                        {article.status === 'published' && (
                          <>
                            <span className="flex items-center gap-1">
                              <Eye className="h-3 w-3" />
                              {article.views.toLocaleString()} 阅读
                            </span>
                            <span>•</span>
                            <span>{article.platform}</span>
                            <span>•</span>
                            <span>{article.publishTime}</span>
                          </>
                        )}
                        {article.status === 'draft' && (
                          <span>草稿 - 可随时编辑发布</span>
                        )}
                        {article.status === 'generating' && (
                          <div className="flex items-center gap-2">
                            <Clock className="h-3 w-3 animate-pulse" />
                            <span>生成中...</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    {article.status === 'published' && (
                      <Badge className="bg-green-500">
                        <CheckCircle2 className="mr-1 h-3 w-3" />
                        已发布
                      </Badge>
                    )}
                    {article.status === 'draft' && (
                      <Badge variant="secondary">草稿</Badge>
                    )}
                    {article.status === 'generating' && (
                      <div className="w-32">
                        <Progress value={article.progress} className="h-1.5" />
                      </div>
                    )}
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <Eye className="mr-2 h-4 w-4" />
                          预览
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Edit className="mr-2 h-4 w-4" />
                          编辑
                        </DropdownMenuItem>
                        {article.status === 'draft' && (
                          <DropdownMenuItem>
                            <Send className="mr-2 h-4 w-4" />
                            发布
                          </DropdownMenuItem>
                        )}
                        {article.status === 'generating' && (
                          <DropdownMenuItem>
                            <RefreshCw className="mr-2 h-4 w-4" />
                            重新生成
                          </DropdownMenuItem>
                        )}
                        <DropdownMenuItem className="text-red-600">
                          <Trash2 className="mr-2 h-4 w-4" />
                          删除
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
