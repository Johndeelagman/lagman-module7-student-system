import { mount } from '@vue/test-utils'
import { describe, it, expect } from 'vitest'
import StudentTable from '../components/StudentTable.vue'

describe('StudentTable - Module 9 Status Filter', () => {
  const students = [
    {
      studentId: '2026-0001',
      fullName: 'Juan Cruz',
      program: 'BSCS',
      yearLevel: '3rd Year',
      status: 'Enrolled'
    },
    {
      studentId: '2026-0002',
      fullName: 'Maria Santos',
      program: 'BSCpE',
      yearLevel: '4th Year',
      status: 'Graduated'
    },
    {
      studentId: '2026-0003',
      fullName: 'Pedro Reyes',
      program: 'BSIT',
      yearLevel: '2nd Year',
      status: 'Inactive'
    }
  ]

  it('displays all students by default', () => {
    const wrapper = mount(StudentTable, {
      props: { students }
    })

    expect(wrapper.findAll('tbody tr')).toHaveLength(3)
  })

  it('filters students by enrollment status', async () => {
    const wrapper = mount(StudentTable, {
      props: { students }
    })

    const select = wrapper.find('select')
    await select.setValue('Enrolled')

    const rows = wrapper.findAll('tbody tr')

    expect(rows).toHaveLength(1)
    expect(rows[0].text()).toContain('Juan Cruz')
    expect(rows[0].text()).not.toContain('Maria Santos')
  })

  it('combines search and status filter', async () => {
    const wrapper = mount(StudentTable, {
      props: { students }
    })

    await wrapper.find('input').setValue('Juan')
    await wrapper.find('select').setValue('Enrolled')

    const rows = wrapper.findAll('tbody tr')

    expect(rows).toHaveLength(1)
    expect(rows[0].text()).toContain('Juan Cruz')
  })

  it('shows no records when search and status do not match', async () => {
    const wrapper = mount(StudentTable, {
      props: { students }
    })

    await wrapper.find('input').setValue('Juan')
    await wrapper.find('select').setValue('Graduated')

    expect(wrapper.text()).toContain('No matching records found')
  })
})