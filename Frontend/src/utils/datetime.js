// datetime.js - helpers for ISO formatting/parsing and storage keys

export const STORAGE_KEYS = {
  // Key aligned with README for future persistence swaps
  turnos: 'serviceHome.turns',
  seeded: 'sh_seeded',
}

export function toISO(date){
  if(!date) return ''
  try{
    const d = (date instanceof Date) ? date : new Date(date)
    return d.toISOString()
  }catch(_){ return '' }
}

export function fromISO(iso){
  try{ return new Date(iso) }catch(_){ return null }
}


