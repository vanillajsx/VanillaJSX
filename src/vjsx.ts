//import { defineAttrsOptions, ElementWithCustomProps, jsxProps, AdditionalElementProps, VJSX } from './@types/vjsx.d';
import './@types/vjsx.d';
import { SVG_TAG_NAMES, ONLY_VIA_SET_ATTRIBUTE } from './data'

Object.defineProperty(EventTarget.prototype, 'on', {
  value: EventTarget.prototype.addEventListener
})


let namelessCustomElementCount = 0
const generateTagName = (name: string): string =>{
  if(name==='default'){
    return `custom-elem-${(namelessCustomElementCount++).toString(36)}`
  }
  return name.replace(/\B[A-Z]/g,'-$&').toLowerCase()
}

const processChild = (element: Element, child: any) =>{
  if(child instanceof Function) {
    child(element)
  }else if(child instanceof Array){
    for(const v of child){
      processChild(element, v)
    }
  }else element.append(child)
}



function render<T extends HTMLTagName>(component: T, props: jsxProps, ...children: JSXChildren): HTMLElementTagNameMap[T] & AdditionalElementProps;
function render<T extends SVGTagName>(component: T, props: jsxProps, ...children: JSXChildren): SVGElementTagNameMap[T] & AdditionalElementProps;
function render<T extends (...args: any) => any>(component: T, props: jsxProps, ...children: JSXChildren): ReturnType<typeof component>;
function render<T extends Function>(component: T, props: jsxProps, ...children: JSXChildren): T["prototype"];
function render (component: HTMLTagName | SVGTagName | Function | any, props: jsxProps, ...children: JSXChildren){
  props ?? (props = {})
  let isSVG = false
  let element: Element;

  if(typeof component === 'string'){
    if(SVG_TAG_NAMES.includes(component)){
      element = document.createElementNS('http://www.w3.org/2000/svg', component)
      isSVG = true
    }else {
      element = document.createElement(component)
    }
  }else if(typeof component === 'function'){
    //if component is custom element class
    if(component?.prototype instanceof Element){
      try{
        element = new component()
      }catch(e){
        customElements.define(
          generateTagName(component.name),
          component
        )
        element = new component()
      }
    }else{
      //if component is a function which returns Element:
      element = component({...props, children: [...children]})
      children.length = 0
    }
  }else{
    throw new Error('using invalid thing used as element tag.')
  }
  if(props){
    for(const key in props){
      const prop = props[key]
      if(key==='ref') prop[0][prop[1]] = element
      else if(isSVG || ONLY_VIA_SET_ATTRIBUTE.includes(key) || key.includes('-')){
        element.setAttribute(key, prop)
      } else {
        //let's see if there would be any problem with IDL attr
        element[key] = prop
      }
      
    }
  }
  processChild(element, children)
  
  return element;
}

const VJSX = {
  r: render,
  Fragment: ({ children }: {children: Element[]}) =>children,
}

export default VJSX
export { useAttr, AttrHolder } from './vjsxlib'
export type ElemType<tagName extends keyof JSXElementTags> = JSXElementTags[tagName]
