import { AnamneseType } from '@/modules/anamneses/types'
import { prisma } from '@/prisma'

export async function getAnamnese(anamneseId: string) {
  const [anamnese] = await prisma.$queryRaw<AnamneseType[]>`
    select a.id,
            a.responsible_name as "responsibleName",
            a.responsible_age as "responsibleAge",
            a.address as "address",
            a.neighborhood as "neighborhood",
            a.city as "city",
            a.phone_number as "phoneNumber",
            a.occupation as "occupation",
            a.religion as "religion",
            a.receives_aid as "receivesAid",
            a.aid_value as "aidValue",
            a.owns_house as "ownsHouse",
            a.pays_rent as "paysRent",
            a.rent_value as "rentValue",
            a.is_mother as "isMother",
            a.relationship as "relationship",
            a.adults_count as "adultsCount",
            a.government_aid as "governmentAid",
            a.government_aid_details as "governmentAidDetails",
            a.government_aid_value as "governmentAidValue",
            a.entity_aid as "entityAid",
            a.entity_aid_details as "entityAidDetails",
            a.entity_aid_frequency as "entityAidFrequency",
            a.entity_aid_received as "entityAidReceived",
            a.required_aid as "requiredAid",
            a.assisted_remarks as "assistedRemarks",
            a.project_remarks as "projectRemarks",
            a.visit_date as "visitDate",
            a.created_at as "createdAt",
            (select coalesce(json_agg(
                jsonb_build_object(
                    'id', c.id,
                    'name', c.name,
                    'age', c.age
                )), '[]')
                from child c
                where c.anamneses_id = a.id and c.deleted_at is null) as "child",
            (select coalesce(json_agg(
                jsonb_build_object(
                    'id', i.id,
                    'name', i.name
                )), '[]')
                from identification i
                where i.anamneses_id = a.id and i.deleted_at is null) as "identification"
        from anamneses a
        where a.id = ${anamneseId}
        `

  return anamnese
}
