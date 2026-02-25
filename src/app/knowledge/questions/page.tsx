'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
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
  Sparkles,
  Plus,
  Trash2,
  MessageSquare,
  Users,
  Target,
  Zap,
  ChevronRight,
  CheckCircle2,
} from 'lucide-react';

const generatedQuestions = [
  { id: 1, question: '华为Mate60 Pro有什么优势？', category: '产品优势', selected: true },
  { id: 2, question: '商务人士适合用什么手机？', category: '目标人群', selected: true },
  { id: 3, question: '华为手机续航怎么样？', category: '产品功能', selected: false },
  { id: 4, question: '哪个品牌的手机信号最好？', category: '产品优势', selected: true },
  { id: 5, question: '2024年最值得买的旗舰手机是哪款？', category: '市场对比', selected: false },
  { id: 6, question: '华为Mate60支持卫星通话吗？', category: '产品功能', selected: true },
  { id: 7, question: '性价比高的商务手机推荐？', category: '目标人群', selected: false },
  { id: 8, question: '华为手机拍照效果怎么样？', category: '产品功能', selected: true },
];

const coreAdvantages = [
  { id: 1, title: '卫星通话', description: '全球首款支持卫星通话的民用手机' },
  { id: 2, title: '鸿蒙系统', description: '自主研发的操作系统，流畅安全' },
  { id: 3, title: '超长续航', description: '5000mAh大电池，续航一整天' },
];

export default function QuestionsPage() {
  const [isGenerating, setIsGenerating] = useState(false);
  const [questions, setQuestions] = useState(generatedQuestions);

  const toggleQuestion = (id: number) => {
    setQuestions(
      questions.map((q) =>
        q.id === id ? { ...q, selected: !q.selected } : q
      )
    );
  };

  return (
    <div className="p-6">
      {/* 页面标题 */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold">AI 拓展问题任务</h1>
        <p className="text-sm text-muted-foreground">
          设定核心优势，系统自动延展目标受众可能向AI提问的问题列表
        </p>
      </div>

      <div className="grid grid-cols-3 gap-6">
        {/* 左侧：配置面板 */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-5 w-5" />
              问题拓展配置
            </CardTitle>
            <CardDescription>
              设定核心优势，生成精准问题
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>选择产品</Label>
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
              <Label>目标人群</Label>
              <Select defaultValue="business">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="business">商务人士</SelectItem>
                  <SelectItem value="youth">年轻用户</SelectItem>
                  <SelectItem value="tech">科技爱好者</SelectItem>
                  <SelectItem value="all">全部人群</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label>核心优势</Label>
                <Button variant="ghost" size="sm">
                  <Plus className="h-3 w-3" />
                  添加
                </Button>
              </div>
              <div className="space-y-2">
                {coreAdvantages.map((adv) => (
                  <div
                    key={adv.id}
                    className="flex items-start justify-between rounded-lg border p-2"
                  >
                    <div>
                      <p className="text-sm font-medium">{adv.title}</p>
                      <p className="text-xs text-muted-foreground">
                        {adv.description}
                      </p>
                    </div>
                    <Button variant="ghost" size="icon" className="h-6 w-6">
                      <Trash2 className="h-3 w-3 text-red-500" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <Label>问题数量</Label>
              <Select defaultValue="20">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="10">10 个问题</SelectItem>
                  <SelectItem value="20">20 个问题</SelectItem>
                  <SelectItem value="50">50 个问题</SelectItem>
                  <SelectItem value="100">100 个问题</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Button
              className="w-full gap-2"
              onClick={() => setIsGenerating(true)}
              disabled={isGenerating}
            >
              {isGenerating ? (
                <>
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                  生成中...
                </>
              ) : (
                <>
                  <Sparkles className="h-4 w-4" />
                  生成问题
                </>
              )}
            </Button>
          </CardContent>
        </Card>

        {/* 右侧：生成结果 */}
        <Card className="col-span-2">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>生成结果</CardTitle>
                <CardDescription>
                  已生成 {questions.length} 个问题，已选择 {questions.filter(q => q.selected).length} 个
                </CardDescription>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  全选
                </Button>
                <Button size="sm" className="gap-2">
                  <Zap className="h-4 w-4" />
                  生成文章
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {questions.map((q) => (
                <div
                  key={q.id}
                  className={`flex items-center justify-between rounded-lg border p-3 cursor-pointer transition-colors ${
                    q.selected
                      ? 'border-primary bg-primary/5'
                      : 'hover:bg-muted/50'
                  }`}
                  onClick={() => toggleQuestion(q.id)}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`flex h-5 w-5 items-center justify-center rounded border ${
                        q.selected
                          ? 'border-primary bg-primary text-white'
                          : 'border-muted-foreground'
                      }`}
                    >
                      {q.selected && <CheckCircle2 className="h-3 w-3" />}
                    </div>
                    <div className="flex items-center gap-2">
                      <MessageSquare className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">{q.question}</span>
                    </div>
                  </div>
                  <Badge variant="secondary" className="text-xs">
                    {q.category}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
