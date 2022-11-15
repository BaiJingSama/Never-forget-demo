import { faker } from '@faker-js/faker'
import { AxiosRequestConfig } from 'axios'

type Mock = (config: AxiosRequestConfig) => [number, any]

faker.setLocale('zh_CN')

let id = 0
const createId = () => {
  id += 1
  return id
}

export const mockItemSummary: Mock = (config) => {
  return [
    200,
    {
      groups: [
        { happen_at: '2022-11-18T00:00:00.000+0800', amount: 100 },
        { happen_at: '2022-11-22T00:00:00.000+0800', amount: 200 },
        { happen_at: '2022-11-29T00:00:00.000+0800', amount: 300 },
      ],
      summary: 600,
    },
  ]
}

export const mockItemIndexBalance: Mock = (config) => {
  return [
    200,
    {
      expenses: 9900,
      income: 9900,
      balance: 0,
    },
  ]
}

export const mockItemIndex: Mock = (config) => {
  const { kind, page } = config.params
  const per_page = 25
  const count = 26
  const createPager = (page = 1) => ({
    page,
    per_page,
    count,
  })
  const createTag = (n = 1, attrs?: any) =>
    Array.from({ length: n }).map(() => ({
      id: createId(),
      name: faker.lorem.word(),
      sign: faker.internet.emoji(),
      kind: config.params.kind,
      ...attrs,
    }))
  const createItem = (n = 1) =>
    Array.from({ length: n }).map(() => ({
      id: createId(),
      user_id: createId(),
      amount: Math.floor(Math.random() * 10000),
      tags_id: [createId()],
      tags: createTag(),
      happen_at: faker.date.past().toISOString(),
      kind: config.params.kind,
    }))
  const createBody = (n = 1, attrs?: any) => ({
    resources: createItem(n),
    pager: createPager(page),
    summary: { income: 9900, expenses: 9900, balance: 0 },
  })
  if (!page || page === 1) {
    return [200, createBody(25)]
  } else if (page === 2) {
    return [200, createBody(1)]
  } else {
    return [200, createBody(1)]
  }
}

export const mockTagEdit: Mock = (config) => {
  const createTag = (attrs?: any) => ({
    id: createId(),
    name: faker.lorem.word(),
    sign: faker.internet.emoji(),
    kind: 'expenses',
    ...attrs,
  })
  return [200, { resource: createTag() }]
}

export const mockTagShow: Mock = (config) => {
  const createTag = (attrs?: any) => ({
    id: createId(),
    name: faker.lorem.word(),
    sign: faker.internet.emoji(),
    kind: 'expenses',
    ...attrs,
  })

  return [200, { resource: createTag() }]
}

export const mockItemCreate: Mock = (config) => {
  return [
    200,
    {
      resource: {
        id: 16286,
        user_id: 9906,
        amount: 9900,
        note: null,
        tag_ids: [26791],
        happen_at: '2020-10-30T00:00:00.000+08:00',
        created_at: '2022-10-15T13:33:03.225+08:00',
        updated_at: '2022-10-15T13:33:03.225+08:00',
        kind: 'expenses',
        deleted_at: null,
      },
    },
  ]
  // return [
  //   422,
  //   {
  //     errors: {
  //       tags_id: ["必须选择标签"],
  //       amount: ["金额不能为0"],
  //     },
  //   },
  // ];
}

export const mockSession: Mock = (config) => {
  return [
    200,
    {
      jwt: faker.random.word(),
    },
  ]
}

export const mockTagIndex: Mock = (config) => {
  const { kind, page } = config.params
  const per_page = 25
  const count = 26

  const createPager = (page = 1) => ({
    page,
    per_page,
    count,
  })
  const createTag = (n = 1, attrs?: any) =>
    Array.from({ length: n }).map(() => ({
      id: createId(),
      name: faker.lorem.word(),
      sign: faker.internet.emoji(),
      kind: config.params.kind,
      ...attrs,
    }))

  const createBody = (n = 1, attrs?: any) => ({
    resources: createTag(n),
    pager: createPager(page),
  })

  if (kind === 'expenses' && (!page || page === 1)) {
    return [200, createBody(25)]
  } else if (kind === 'expenses' && page === 2) {
    return [200, createBody(1)]
  } else if (kind === 'income' && (!page || page === 1)) {
    return [200, createBody(25)]
  } else {
    return [200, createBody(1)]
  }
}
