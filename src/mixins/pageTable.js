// 用于具有表格分页功能的组件使用
export default which => ({
  data() {
    return {
      loading: false,
      params: {},
      columns: [],
      data: [],
      tableFilter: {},
      pagination: {
        defaultCurrent: 1,
        current: 1,
        pageSize: 15,
        total: 0,
      },
    };
  },

  created() {
    if (typeof this[`${which}Columns`] === 'function') {
      this.columns = this[`${which}Columns`]();
    }
    const filterPage = ['whiteList', 'device', 'url']; // 过滤黑白名单界面 | 设备管理界面 | URL管理
    if (filterPage.includes(which)) {
      if (this.projectid) {
        this[`${which}Fetch`]();
      }
    } else {
      this[`${which}Fetch`]();
    }
  },

  methods: {
    async [`${which}Fetch`]() {
      const $which = this;
      $which.loading = true;

      const { pagination, tableFilter } = $which;
      const params = {
        offset: pagination.current,
        limit: pagination.pageSize,
        ...($which.params || {}),
      };
      Object.keys(tableFilter).map(v => {
        params[v] = JSON.stringify(tableFilter[v]);
      });
      const result = await this[`${which}FetchList`](params);
      if (result) {
        const { data = [], total } = result;
        $which.data = data || [];
        pagination.total = total || 0;
        $which.loading = false;
      }
    },

    [`${which}ShowBeforeTotal`](total, pageSize, totalPage, page, range) {
      return `共${total}条，每页显示${pageSize}条`;
    },

    [`${which}Change`](p, filter, sorter) {
      const { pagination } = this;
      pagination.current = Math.abs(parseInt(p.current));
      pagination.pageSize = p.pageSize;
      this.tableFilter = filter;
      this[`${which}Fetch`]();
    },

    [`${which}FormatPagination`](operate) {
      const { data, pagination } = this;
      console.log(this.data);
      if (operate === 'add') {
        if (data.length === pagination.pageSize) {
          this.pagination.current = pagination.current + 1;
        }
      } else if (data.length === 1) {
        if (pagination.current > 1) {
          this.pagination.current = pagination.current - 1;
        }
      }
    },
  },
});
