<template>
  <el-card class="upload-card">
    <template #header>
      <div class="card-header">
        <span>商品信息录入</span>
      </div>
    </template>

    <el-form ref="formRef" :model="form" :rules="rules" label-width="100px">
      <el-form-item label="商品图片" prop="images">
        <el-upload
          v-model:file-list="fileList"
          action="#"
          list-type="picture-card"
          :auto-upload="false"
          :on-change="handleChange"
          :on-preview="handlePreview"
          :on-remove="handleRemove"
          accept="image/jpeg,image/png"
        >
          <el-icon><Plus /></el-icon>
          <template #tip>
            <div class="el-upload__tip">支持jpg/png格式，单张不超过5MB</div>
          </template>
        </el-upload>

        <el-dialog v-model="dialogVisible">
          <img w-full :src="dialogImageUrl" alt="Preview Image" style="max-width: 100%" />
        </el-dialog>
      </el-form-item>

      <el-form-item label="商品标题" prop="title">
        <el-input v-model="form.title" placeholder="请输入商品标题" />
      </el-form-item>

      <el-form-item label="商品描述">
        <el-input
          v-model="form.description"
          type="textarea"
          rows="4"
          placeholder="选填：请输入商品描述（最多500字）"
        />
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="handleSubmit">提交</el-button>
        <el-button @click="resetForm">重置</el-button>
      </el-form-item>
    </el-form>
  </el-card>

  <el-dialog v-model="qualityDialogVisible" title="商品信息质量评估">
    <el-row :gutter="20">
      <el-col :span="12">
        <div class="quality-score">
          <span>清晰度：</span>
          <el-rate v-model="qualityScore.clarity" disabled show-score text-color="#ff9900" score-template="{value}"></el-rate>
          <el-tag :type="getScoreType(qualityScore.clarity)">{{ getScoreLevel(qualityScore.clarity) }}</el-tag>
        </div>
      </el-col>
      <el-col :span="12">
        <div class="quality-score">
          <span>完整度：</span>
          <el-rate v-model="qualityScore.completeness" disabled show-score text-color="#ff9900" score-template="{value}"></el-rate>
          <el-tag :type="getScoreType(qualityScore.completeness)">{{ getScoreLevel(qualityScore.completeness) }}</el-tag>
        </div>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="12">
        <div class="quality-score">
          <span>美观度：</span>
          <el-rate v-model="qualityScore.aesthetic" disabled show-score text-color="#ff9900" score-template="{value}"></el-rate>
          <el-tag :type="getScoreType(qualityScore.aesthetic)">{{ getScoreLevel(qualityScore.aesthetic) }}</el-tag>
        </div>
      </el-col>
      <el-col :span="12">
        <div class="quality-score">
          <span>一致性：</span>
          <el-rate v-model="qualityScore.consistency" disabled show-score text-color="#ff9900" score-template="{value}"></el-rate>
          <el-tag :type="getScoreType(qualityScore.consistency)">{{ getScoreLevel(qualityScore.consistency) }}</el-tag>
        </div>
      </el-col>
    </el-row>
    <div v-if="qualityScore.suggestions.length > 0">
      <h4>建议：</h4>
      <ul>
        <li v-for="suggestion in qualityScore.suggestions" :key="suggestion">{{ suggestion }}</li>
      </ul>
    </div>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="qualityDialogVisible = false">取消</el-button>
        <el-button type="primary" @click="confirmUpload">确认上传</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { Plus } from '@element-plus/icons-vue'
import type { FormInstance, UploadUserFile } from 'element-plus'
import { ElMessage } from 'element-plus'

const formRef = ref<FormInstance>()
const fileList = ref<UploadUserFile[]>([])
const dialogImageUrl = ref('')
const dialogVisible = ref(false)
const qualityDialogVisible = ref(false)

const form = reactive({
  title: '',
  description: '',
  images: [] as string[]
})

const qualityScore = reactive({
  clarity: 0,
  completeness: 0,
  aesthetic: 0,
  consistency: 0,
  suggestions: [] as string[]
})

const rules = {
  title: [
    { required: true, message: '请输入商品标题', trigger: 'blur' },
    { min: 5, max: 100, message: '标题长度在5-100个字符之间', trigger: 'blur' }
  ],
  description: [
    { max: 500, message: '描述长度不能超过500个字符', trigger: 'blur' }
  ],
  images: [
    { required: true, message: '请上传至少一张商品图片', trigger: 'change' }
  ]
}

const handleChange = (uploadFile: UploadUserFile) => {
  if (uploadFile.raw) {
    const isImage = uploadFile.raw.type === 'image/jpeg' || uploadFile.raw.type === 'image/png'
    const isLt5M = uploadFile.raw.size / 1024 / 1024 < 5

    if (!isImage) {
      ElMessage.error('只能上传jpg/png格式的图片！')
      return false
    }
    if (!isLt5M) {
      ElMessage.error('图片大小不能超过5MB！')
      return false
    }

    const reader = new FileReader()
    reader.onload = (e) => {
      if (e.target?.result) {
        form.images.push(e.target.result as string)
      }
    }
    reader.readAsDataURL(uploadFile.raw)
  }
}

const handlePreview = (uploadFile: UploadUserFile) => {
  dialogImageUrl.value = uploadFile.url!
  dialogVisible.value = true
}

const handleRemove = (uploadFile: UploadUserFile) => {
  const index = fileList.value.indexOf(uploadFile)
  if (index !== -1) {
    fileList.value.splice(index, 1)
    form.images.splice(index, 1)
  }
}

const assessQuality = () => {
  // 模拟质量评估过程
  qualityScore.clarity = Number((Math.random() * 0.4 + 0.6).toFixed(2)) // 60-100分
  qualityScore.completeness = Number((Math.random() * 0.4 + 0.6).toFixed(2))
  qualityScore.aesthetic = Number((Math.random() * 0.4 + 0.6).toFixed(2))
  qualityScore.consistency = Number((Math.random() * 0.4 + 0.6).toFixed(2))

  // 根据评分生成建议
  qualityScore.suggestions = []
  if (qualityScore.clarity < 0.8) {
    qualityScore.suggestions.push('建议提供更清晰的商品图片')
  }
  if (qualityScore.completeness < 0.8) {
    qualityScore.suggestions.push('建议展示商品的更多角度')
  }
  if (qualityScore.aesthetic < 0.8) {
    qualityScore.suggestions.push('建议优化图片构图和光线')
  }
  if (qualityScore.consistency < 0.8) {
    qualityScore.suggestions.push('建议确保图片与商品描述的一致性')
  }
  if (form.description.length < 50) {
    qualityScore.suggestions.push('建议补充更详细的商品描述')
  }
}

const getScoreType = (score: number) => {
  if (score >= 0.9) return 'success'
  if (score >= 0.8) return 'warning'
  return 'danger'
}

const getScoreLevel = (score: number) => {
  if (score >= 0.9) return '优秀'
  if (score >= 0.8) return '良好'
  return '需改进'
}

const handleSubmit = async () => {
  if (!formRef.value) return
  
  await formRef.value.validate((valid) => {
    if (valid) {
      assessQuality()
      qualityDialogVisible.value = true
    }
  })
}

const confirmUpload = () => {
  console.log('提交表单：', form)
  ElMessage.success('提交成功！')
  qualityDialogVisible.value = false
  resetForm()
}

const resetForm = () => {
  if (!formRef.value) return
  formRef.value.resetFields()
  fileList.value = []
  form.images = []
}
</script>

<style scoped>
.upload-card {
  margin: 20px;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

:deep(.el-upload--picture-card) {
  width: 150px;
  height: 150px;
  line-height: 150px;
}

:deep(.el-upload-list--picture-card .el-upload-list__item) {
  width: 150px;
  height: 150px;
}

.el-upload__tip {
  font-size: 12px;
  color: #666;
  margin-top: 8px;
}

.quality-score {
  margin-bottom: 20px;
}

.quality-score span {
  font-weight: bold;
  margin-right: 10px;
}
</style>
