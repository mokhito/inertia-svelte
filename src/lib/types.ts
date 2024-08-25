import type { PageProps } from '@inertiajs/core'
import type { ComponentType } from 'svelte'

export type ComponentResolver = (name: string) => ComponentType | InertiaComponentType | Promise<ComponentType | InertiaComponentType>

export interface InertiaComponentType extends ComponentType {
  default: InertiaComponentType
  layout: InertiaComponentType
  props: PageProps
}
