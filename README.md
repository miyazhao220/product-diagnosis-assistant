# 商品同品检索分析平台

## 项目简介
基于Vue3的商品同品检索分析平台，为商品运营和算法工程师提供高效的商品管理和检索工具。

## 技术栈
- 前端框架：Vue 3 + TypeScript
- 状态管理：Pinia
- UI组件库：Element Plus
- 路由：Vue Router
- 图表库：ECharts
- HTTP客户端：Axios
- 开发工具：Vite

## 项目结构
```
├── src/
│   ├── api/           # API接口
│   ├── assets/        # 静态资源
│   ├── components/    # 公共组件
│   ├── layouts/       # 布局组件
│   ├── router/        # 路由配置
│   ├── stores/        # 状态管理
│   ├── types/         # TypeScript类型定义
│   ├── utils/         # 工具函数
│   └── views/         # 页面组件
├── public/            # 公共资源
└── tests/             # 测试文件
```

## 主要功能模块
1. 商品库管理
   - 商品信息录入
   - 商品质量评估
   - 同品库构建

2. 商品检索
   - 多模态搜索
   - 结果分析
   - 同品展示

## 开发环境设置
```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 构建生产版本
npm run build
```

## API文档
详见 `/docs/api.md`
