import { forwardRef, HTMLAttributes, TdHTMLAttributes, ThHTMLAttributes } from 'react'
import { TbCaretDownFilled, TbCaretUpFilled } from 'react-icons/tb'
import { StyleHelper } from '@renderer/helpers/StyleHelper'

const Root = forwardRef<HTMLTableElement, HTMLAttributes<HTMLTableElement>>(({ className, ...props }, ref) => (
  <table ref={ref} className={StyleHelper.mergeStyles('w-full caption-bottom text-xs', className)} {...props} />
))

const Header = forwardRef<HTMLTableSectionElement, HTMLAttributes<HTMLTableSectionElement>>((props, ref) => (
  <thead ref={ref} {...props} />
))

const Body = forwardRef<HTMLTableSectionElement, HTMLAttributes<HTMLTableSectionElement>>((props, ref) => (
  <tbody ref={ref} {...props} />
))

const Footer = forwardRef<HTMLTableSectionElement, HTMLAttributes<HTMLTableSectionElement>>(
  ({ className, ...props }, ref) => (
    <tfoot
      ref={ref}
      className={StyleHelper.mergeStyles(
        'border-t border-gray-300/30 bg-transparent font-medium [&>tr]:last:border-b-0',
        className
      )}
      {...props}
    />
  )
)

const HeaderRow = forwardRef<HTMLTableRowElement, HTMLAttributes<HTMLTableRowElement>>(
  ({ className, ...props }, ref) => (
    <tr ref={ref} className={StyleHelper.mergeStyles('transition-colors', className)} {...props} />
  )
)

const BodyRow = forwardRef<HTMLTableRowElement, HTMLAttributes<HTMLTableRowElement>>(({ className, ...props }, ref) => (
  <tr
    ref={ref}
    className={StyleHelper.mergeStyles(
      'transition-colors even:bg-gray-300/15 hover:bg-gray-900/50 border-l-2 hover:border-neon border-transparent',
      className
    )}
    {...props}
  />
))

type THeadProps = {
  sortable?: boolean
  sortedBy?: 'asc' | 'desc' | false
}
const Head = forwardRef<HTMLTableCellElement, ThHTMLAttributes<HTMLTableCellElement> & THeadProps>(
  ({ className, children, sortable, sortedBy, ...props }, ref) => (
    <th
      ref={ref}
      className={StyleHelper.mergeStyles(
        'h-9 px-2 text-left align-middle font-medium text-gray-100 [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]',
        { 'cursor-pointer hover:text-white': sortable },
        className
      )}
      {...props}
    >
      <div className="flex gap-1.5 items-center">
        {children}
        {sortable && (
          <div className="relative ">
            <TbCaretUpFilled
              className={StyleHelper.mergeStyles('-mb-1.5 opacity-30', {
                'opacity-100 text-white': sortedBy === 'asc',
              })}
            />
            <TbCaretDownFilled
              className={StyleHelper.mergeStyles('-mt-1.5 opacity-30', {
                'opacity-100 text-white': sortedBy === 'desc',
              })}
            />
          </div>
        )}
      </div>
    </th>
  )
)

const Cell = forwardRef<HTMLTableCellElement, TdHTMLAttributes<HTMLTableCellElement>>(
  ({ className, ...props }, ref) => (
    <td
      ref={ref}
      className={StyleHelper.mergeStyles(
        'p-2 px-2.5 align-middle whitespace-nowrap text-white [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]',
        className
      )}
      {...props}
    />
  )
)

export const Table = { Root, Header, Body, Footer, BodyRow, HeaderRow, Head, Cell }
