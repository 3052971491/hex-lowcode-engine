# ================== STEP 1: Build ==================
FROM node:22.3.0 as builder

# 将源码复制到 /app 目录中
WORKDIR /app
COPY . .

# 还原 node_modules
# 设置淘宝镜像源
RUN npm config set registry https://registry.npm.taobao.org
RUN yarn config set registry https://registry.npm.taobao.org

RUN yarn install
RUN ls -l
RUN echo "package restore is success"

# 编译项目
# RUN yarn build
RUN yarn build
RUN echo "build is success"

# ================== STEP 2: Publish ==================
FROM nginx:1.19.6

# 复制 nginx.conf 配置文件到镜像中
COPY ["./_nginx/default.conf", "/etc/nginx/nginx.conf"]

# 删除 nginx html 原有内容
RUN rm -rf /usr/share/nginx/html/*

EXPOSE 80

# 从编译镜像复制编译结果到此镜像
COPY --from=builder /app/dist /usr/share/nginx/html
