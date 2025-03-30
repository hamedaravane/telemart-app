'use client';

import { OrderStatus, OrderSummary } from '@/libs/orders/types';
import { Badge, Card, CardBody, CardHeader } from '@heroui/react';
import { format } from 'date-fns';
import Link from 'next/link';
import Price from '@/components/shared/price';

interface OrderSummaryCardProps {
  order: OrderSummary;
  href?: string;
  className?: string;
}

export default function OrderSummaryCard({ order, href, className }: OrderSummaryCardProps) {
  const { id, status, totalAmount, store, deliveryDate, createdAt } = order;

  const cardContent = (
    <Card className={`w-full ${className}`}>
      <CardHeader className="flex justify-between items-center">
        <div>
          <h3 className="text-sm font-semibold">Order #{id}</h3>
          <p className="text-xs text-gray-500">
            {format(new Date(createdAt), 'PP')} —{' '}
            <span className="text-gray-400">{store.name}</span>
          </p>
        </div>
        <Badge color={getOrderStatusColor(status)} size="sm">
          {getOrderStatusLabel(status)}
        </Badge>
      </CardHeader>

      <CardBody className="text-sm text-gray-700">
        <div className="flex justify-between items-center">
          <Price amount={totalAmount} />
          <div className="text-xs text-gray-500 text-right">
            <p className="font-medium">Est. Delivery</p>
            <p>{format(new Date(deliveryDate), 'PP')}</p>
          </div>
        </div>
      </CardBody>
    </Card>
  );

  return href ? <Link href={href}>{cardContent}</Link> : cardContent;
}

export function getOrderStatusLabel(status: OrderStatus): string {
  switch (status) {
    case OrderStatus.PENDING:
      return 'Pending';
    case OrderStatus.CONFIRMED:
      return 'Confirmed';
    case OrderStatus.PROCESSING:
      return 'Processing';
    case OrderStatus.SHIPPED:
      return 'Shipped';
    case OrderStatus.DELIVERED:
      return 'Delivered';
    case OrderStatus.COMPLETED:
      return 'Completed';
    case OrderStatus.CANCELED:
      return 'Canceled';
    case OrderStatus.REFUNDED:
      return 'Refunded';
    default:
      return 'Unknown';
  }
}

export function getOrderStatusColor(
  status: OrderStatus,
): 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'danger' {
  switch (status) {
    case OrderStatus.PENDING:
      return 'warning';
    case OrderStatus.CONFIRMED:
    case OrderStatus.PROCESSING:
      return 'secondary';
    case OrderStatus.SHIPPED:
      return 'primary';
    case OrderStatus.DELIVERED:
    case OrderStatus.COMPLETED:
      return 'success';
    case OrderStatus.CANCELED:
    case OrderStatus.REFUNDED:
      return 'danger';
    default:
      return 'default';
  }
}
