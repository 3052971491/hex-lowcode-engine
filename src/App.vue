<template>
  <div>
    <HexTable @register="register">
      <template #bodyCell="{ column, record, index }">
        <template v-if="column.dataIndex === 'action'">
          <TableAction
            :actions="[
              {
                label: '编辑',
                onClick: () => handleEdit(record),
              },
              {
                label: '删除',
                onClick: () => handleDelete(record),
              },
            ]"
          />
        </template>
        <template v-else-if="column.dataIndex === 'no'">
          <template v-if="isBoolean(methods.getPaginationRef())">
            {{ index + 1 }}
          </template>
          <template v-else>
            {{
              ((methods.getPaginationRef() as any).current - 1) * (methods.getPaginationRef() as any).pageSize +
              index +
              1
            }}
          </template>
        </template>
      </template>
      <!--  -->
    </HexTable>
  </div>
</template>

<script setup lang="ts">
import { isBoolean } from './utils/is';
import { HexTable, TableAction } from '/@/components/hex-table';
import useTable from '/@/components/hex-table/src/hooks/useTable';

// This starter template is using Vue 3 <script setup> SFCs
// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup

const [register, methods] = useTable({
  title: '用户列表',
  api: (params) => {
    const arr = [];
    const total = 100;
    for (let index = 0; index < total; index++) {
      arr.push({
        id: `${index}`,
        userName: '好想看樱花',
        name: '俊杰',
        surname: '袁',
        emailAddress: '3052971491@qq.com',
      });
    }
    return Promise.resolve({
      content: arr,
      totalPages: total,
    });
  },
  rowKey: 'id',
  bordered: true,
  columns: [
    {
      title: '序号',
      dataIndex: 'no',
      fixed: 'left',
      width: 62,
      align: 'center',
    },
    {
      title: '用户名',
      dataIndex: 'userName',
      fixed: 'left',
      width: 200,
      ellipsis: true,
    },
    {
      title: '名字',
      dataIndex: 'name',
      width: 200,
      ellipsis: true,
    },
    {
      title: '姓氏',
      dataIndex: 'surname',
      width: 200,
      ellipsis: true,
    },
    {
      title: '角色',
      dataIndex: 'roles',
      width: 200,
      ellipsis: true,
    },
    {
      title: '邮箱地址',
      dataIndex: 'emailAddress',
      width: 200,
    },
    {
      title: '邮箱地址确认',
      dataIndex: 'isEmailConfirmed',
      width: 200,
    },
    {
      title: '激活',
      dataIndex: 'isActive',
      width: 60,
    },
    {
      title: '创建时间',
      dataIndex: 'createDate',
      width: 200,
      format: 'date|YYYY-MM-DD HH:mm:ss',
    },
  ],
  actionColumn: {
    width: 160,
    title: '操作栏',
    fixed: 'right',
    align: 'center',
    dataIndex: 'action',
  },
  rowSelection: {
    type: 'checkbox',
  },
});
const handleDelete = ({ record }: any) => {
  console.log(record);
};
const handleEdit = ({ record }: any) => {
  console.log(record);
};
</script>

<style scoped></style>
