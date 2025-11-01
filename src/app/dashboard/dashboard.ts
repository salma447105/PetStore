import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

interface StatCard {
  title: string;
  value: string;
  change: number;
  icon: string;
  color: string;
}

interface RecentActivity {
  id: number;
  user: string;
  action: string;
  time: string;
  status: 'success' | 'pending' | 'error';
}

interface SalesData {
  month: string;
  sales: number;
  revenue: number;
}

interface Product {
  name: string;
  category: string;
  sales: number;
}

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.html',
  styleUrls: []
})
export class dashboard implements OnInit {
  Math = Math;
  animatedSales: number[] = [];

  ngOnInit() {
    this.animateSalesBars();
  }

  animateSalesBars() {
    this.salesData.forEach((_, index) => {
      this.animatedSales[index] = 5;
      
      setTimeout(() => {
        const targetValue = (this.salesData[index].sales / this.maxSales) * 100;
        const duration = 1000;
        const steps = 60;
        const increment = (targetValue - 10) / steps;
        let currentStep = 0;

        const interval = setInterval(() => {
          currentStep++;
          this.animatedSales[index] = 10 + (increment * currentStep);

          if (currentStep >= steps) {
            this.animatedSales[index] = targetValue;
            clearInterval(interval);
          }
        }, duration / steps);
      }, index * 100);
    });
  }

  stats: StatCard[] = [
    {
      title: 'Total Revenue',
      value: '$45,231',
      change: 12.5,
      icon: '💰',
      color: 'blue'
    },
    {
      title: 'Total Orders',
      value: '1,234',
      change: 8.2,
      icon: '📦',
      color: 'green'
    },
    {
      title: 'Active Users',
      value: '8,549',
      change: -3.1,
      icon: '👥',
      color: 'purple'
    },
    {
      title: 'Conversion Rate',
      value: '3.24%',
      change: 5.7,
      icon: '📈',
      color: 'orange'
    }
  ];

  salesData: SalesData[] = [
    { month: 'Jan', sales: 245, revenue: 12450 },
    { month: 'Feb', sales: 312, revenue: 15600 },
    { month: 'Mar', sales: 289, revenue: 14450 },
    { month: 'Apr', sales: 401, revenue: 20050 },
    { month: 'May', sales: 378, revenue: 18900 },
    { month: 'Jun', sales: 456, revenue: 22800 }
  ];

  maxSales = Math.max(...this.salesData.map(d => d.sales));

  topProducts: Product[] = [
    { name: 'Premium Widget', category: 'Electronics', sales: 342 },
    { name: 'Deluxe Package', category: 'Services', sales: 289 },
    { name: 'Starter Kit', category: 'Accessories', sales: 256 },
    { name: 'Pro Bundle', category: 'Software', sales: 198 },
    { name: 'Basic Plan', category: 'Subscription', sales: 167 }
  ];

  recentActivities: RecentActivity[] = [
    { id: 1, user: 'John Doe', action: 'Created new order #5847', time: '2 mins ago', status: 'success' },
    { id: 2, user: 'Sarah Smith', action: 'Updated customer profile', time: '15 mins ago', status: 'success' },
    { id: 3, user: 'Mike Johnson', action: 'Payment processing', time: '1 hour ago', status: 'pending' },
    { id: 4, user: 'Emma Wilson', action: 'Completed shipment #2849', time: '2 hours ago', status: 'success' },
    { id: 5, user: 'David Brown', action: 'Failed login attempt', time: '3 hours ago', status: 'error' },
    { id: 6, user: 'Lisa Anderson', action: 'Generated monthly report', time: '4 hours ago', status: 'success' }
  ];
}