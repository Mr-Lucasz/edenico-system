'use client'

import Link from 'next/link'
import { useState } from 'react'
import {
  FiCalendar,
  FiCreditCard,
  FiEye,
  FiEyeOff,
  FiLock,
  FiMail,
  FiShield,
  FiUser,
} from 'react-icons/fi'
import { FaChalkboardTeacher, FaGraduationCap, FaUserGraduate } from 'react-icons/fa'
import { MdFamilyRestroom } from 'react-icons/md'
import { REGISTER_COPY } from '@src/constants/authCopy'
import formStyles from './AuthForms.module.scss'
import styles from './RegisterForm.module.scss'

type Role = 'estudante' | 'professor' | 'pai'

export function RegisterForm() {
  const [role, setRole] = useState<Role>('estudante')
  const [show1, setShow1] = useState(false)
  const [show2, setShow2] = useState(false)

  return (
    <div>
      <div className={formStyles.formHeader}>
        <div className={formStyles.iconBox} aria-hidden>
          <FaGraduationCap size={28} />
        </div>
        <h2 className={formStyles.title}>{REGISTER_COPY.title}</h2>
        <p className={formStyles.subtitle}>{REGISTER_COPY.subtitle}</p>
      </div>

      <div className={styles.roleRow} role="tablist" aria-label="Tipo de perfil">
        <button
          type="button"
          role="tab"
          aria-selected={role === 'estudante'}
          className={`${styles.roleBtn} ${role === 'estudante' ? styles.roleActiveEstudante : ''}`}
          onClick={() => setRole('estudante')}
        >
          <FaUserGraduate className={styles.roleIcon} aria-hidden />
          {REGISTER_COPY.roles.estudante}
        </button>
        <button
          type="button"
          role="tab"
          aria-selected={role === 'professor'}
          className={`${styles.roleBtn} ${role === 'professor' ? styles.roleActiveProfessor : ''}`}
          onClick={() => setRole('professor')}
        >
          <FaChalkboardTeacher className={styles.roleIcon} aria-hidden />
          {REGISTER_COPY.roles.professor}
        </button>
        <button
          type="button"
          role="tab"
          aria-selected={role === 'pai'}
          className={`${styles.roleBtn} ${role === 'pai' ? styles.roleActivePai : ''}`}
          onClick={() => setRole('pai')}
        >
          <MdFamilyRestroom className={styles.roleIcon} aria-hidden />
          {REGISTER_COPY.roles.pai}
        </button>
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault()
        }}
      >
        {role === 'estudante' ? (
          <>
            <div className={`${styles.section} ${styles.sectionEstudantePersonal}`}>
              <h3 className={`${styles.sectionTitle} ${styles.sectionTitleBlue}`}>
                <FiUser aria-hidden />
                {REGISTER_COPY.sections.personal}
              </h3>
              <div className={formStyles.field}>
                <label className={formStyles.label} htmlFor="reg-name">
                  {REGISTER_COPY.fields.fullName}
                </label>
                <div className={formStyles.inputWrap}>
                  <FiUser className={formStyles.inputIcon} aria-hidden />
                  <input id="reg-name" className={formStyles.input} type="text" placeholder="Seu nome" />
                </div>
              </div>
              <div className={formStyles.field}>
                <label className={formStyles.label} htmlFor="reg-birth">
                  {REGISTER_COPY.fields.birth}
                </label>
                <div className={formStyles.inputWrap}>
                  <FiCalendar className={formStyles.inputIcon} aria-hidden />
                  <input id="reg-birth" className={formStyles.input} type="text" placeholder="dd/mm/aaaa" />
                </div>
              </div>
            </div>
            <div className={`${styles.section} ${styles.sectionEstudanteGuardian}`}>
              <h3 className={`${styles.sectionTitle} ${styles.sectionTitlePink}`}>
                <FiShield aria-hidden />
                {REGISTER_COPY.sections.guardian}
              </h3>
              <div className={formStyles.field}>
                <label className={formStyles.label} htmlFor="reg-guardian-email">
                  {REGISTER_COPY.fields.guardianEmail}
                </label>
                <div className={formStyles.inputWrap}>
                  <FiMail className={formStyles.inputIcon} aria-hidden />
                  <input id="reg-guardian-email" className={formStyles.input} type="email" />
                </div>
              </div>
            </div>
            <div className={`${styles.section} ${styles.sectionEstudanteAccount}`}>
              <h3 className={`${styles.sectionTitle} ${styles.sectionTitleBlue}`}>
                <FiLock aria-hidden />
                {REGISTER_COPY.sections.accountAlt}
              </h3>
              <div className={formStyles.field}>
                <label className={formStyles.label} htmlFor="reg-cpf-e">
                  {REGISTER_COPY.fields.cpf}
                </label>
                <div className={formStyles.inputWrap}>
                  <FiCreditCard className={formStyles.inputIcon} aria-hidden />
                  <input id="reg-cpf-e" className={formStyles.input} type="text" inputMode="numeric" />
                </div>
              </div>
              <div className={formStyles.field}>
                <label className={formStyles.label} htmlFor="reg-email-e">
                  {REGISTER_COPY.fields.email}
                </label>
                <div className={formStyles.inputWrap}>
                  <FiMail className={formStyles.inputIcon} aria-hidden />
                  <input id="reg-email-e" className={formStyles.input} type="email" />
                </div>
              </div>
              <div className={formStyles.row2}>
                <div className={formStyles.field}>
                  <label className={formStyles.label} htmlFor="reg-pw1-e">
                    {REGISTER_COPY.fields.password}
                  </label>
                  <div className={formStyles.inputWrap}>
                    <FiLock className={formStyles.inputIcon} aria-hidden />
                    <input
                      id="reg-pw1-e"
                      className={`${formStyles.input} ${formStyles.inputWithToggle}`}
                      type={show1 ? 'text' : 'password'}
                    />
                    <button
                      type="button"
                      className={formStyles.toggleEye}
                      onClick={() => setShow1((v) => !v)}
                      aria-label="Mostrar senha"
                    >
                      {show1 ? <FiEyeOff /> : <FiEye />}
                    </button>
                  </div>
                </div>
                <div className={formStyles.field}>
                  <label className={formStyles.label} htmlFor="reg-pw2-e">
                    {REGISTER_COPY.fields.confirmPassword}
                  </label>
                  <div className={formStyles.inputWrap}>
                    <FiLock className={formStyles.inputIcon} aria-hidden />
                    <input
                      id="reg-pw2-e"
                      className={`${formStyles.input} ${formStyles.inputWithToggle}`}
                      type={show2 ? 'text' : 'password'}
                    />
                    <button
                      type="button"
                      className={formStyles.toggleEye}
                      onClick={() => setShow2((v) => !v)}
                      aria-label="Mostrar confirmação"
                    >
                      {show2 ? <FiEyeOff /> : <FiEye />}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : (
          <>
            <div className={`${styles.section} ${styles.sectionDefaultPersonal}`}>
              <h3 className={`${styles.sectionTitle} ${styles.sectionTitlePurple}`}>
                <FiUser aria-hidden />
                {REGISTER_COPY.sections.personal}
              </h3>
              <div className={formStyles.field}>
                <label className={formStyles.label} htmlFor="reg-name-p">
                  {REGISTER_COPY.fields.fullName}
                </label>
                <div className={formStyles.inputWrap}>
                  <FiUser className={formStyles.inputIcon} aria-hidden />
                  <input id="reg-name-p" className={formStyles.input} type="text" />
                </div>
              </div>
              <div className={formStyles.field}>
                <label className={formStyles.label} htmlFor="reg-email-p">
                  {REGISTER_COPY.fields.email}
                </label>
                <div className={formStyles.inputWrap}>
                  <FiMail className={formStyles.inputIcon} aria-hidden />
                  <input id="reg-email-p" className={formStyles.input} type="email" />
                </div>
              </div>
            </div>
            <div className={`${styles.section} ${styles.sectionDefaultAccount}`}>
              <h3 className={`${styles.sectionTitle} ${styles.sectionTitleBlue}`}>
                <FiShield aria-hidden />
                {REGISTER_COPY.sections.account}
              </h3>
              <div className={formStyles.field}>
                <label className={formStyles.label} htmlFor="reg-cpf-p">
                  {REGISTER_COPY.fields.cpf}
                </label>
                <div className={formStyles.inputWrap}>
                  <FiCreditCard className={formStyles.inputIcon} aria-hidden />
                  <input id="reg-cpf-p" className={formStyles.input} type="text" inputMode="numeric" />
                </div>
              </div>
              <div className={formStyles.row2}>
                <div className={formStyles.field}>
                  <label className={formStyles.label} htmlFor="reg-pw1-p">
                    {REGISTER_COPY.fields.password}
                  </label>
                  <div className={formStyles.inputWrap}>
                    <FiLock className={formStyles.inputIcon} aria-hidden />
                    <input
                      id="reg-pw1-p"
                      className={`${formStyles.input} ${formStyles.inputWithToggle}`}
                      type={show1 ? 'text' : 'password'}
                    />
                    <button
                      type="button"
                      className={formStyles.toggleEye}
                      onClick={() => setShow1((v) => !v)}
                      aria-label="Mostrar senha"
                    >
                      {show1 ? <FiEyeOff /> : <FiEye />}
                    </button>
                  </div>
                </div>
                <div className={formStyles.field}>
                  <label className={formStyles.label} htmlFor="reg-pw2-p">
                    {REGISTER_COPY.fields.confirmPassword}
                  </label>
                  <div className={formStyles.inputWrap}>
                    <FiLock className={formStyles.inputIcon} aria-hidden />
                    <input
                      id="reg-pw2-p"
                      className={`${formStyles.input} ${formStyles.inputWithToggle}`}
                      type={show2 ? 'text' : 'password'}
                    />
                    <button
                      type="button"
                      className={formStyles.toggleEye}
                      onClick={() => setShow2((v) => !v)}
                      aria-label="Mostrar confirmação"
                    >
                      {show2 ? <FiEyeOff /> : <FiEye />}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}

        <div className={formStyles.actions}>
          <Link href="/" className={`${formStyles.btn} ${formStyles.btnMuted}`}>
            {REGISTER_COPY.cancel}
          </Link>
          <button type="submit" className={`${formStyles.btn} ${formStyles.btnPrimary}`}>
            {REGISTER_COPY.submit}
          </button>
        </div>
      </form>

      <p className={formStyles.footerLink}>
        {REGISTER_COPY.footer}{' '}
        <Link href="/login" className={formStyles.footerLinkA}>
          {REGISTER_COPY.footerLink}
        </Link>
      </p>
    </div>
  )
}
