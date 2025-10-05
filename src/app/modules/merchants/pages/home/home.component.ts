import { Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
import { Direction } from '@angular/cdk/bidi';
import * as L from 'leaflet';
import { SystemLanguage } from '../../../shared/models/system-language.model';
import { TranslationService } from '../../../../core/services/translation.service';

@Component({
  selector: 'app-home',
  standalone: true,
  template: `
    <div class="space-y-6">
      <!-- Welcome Section -->
      <div class="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <h1 class="text-2xl font-semibold text-gray-800 dark:text-white">Welcome back!</h1>
        <p class="mt-2 text-gray-600 dark:text-gray-300">Here's what's happening with your projects today.</p>
      </div>

      <!-- Stats Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div class="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <div class="flex items-center">
            <div class="flex-1">
              <h3 class="text-lg font-medium text-gray-900 dark:text-white">Total Projects</h3>
              <p class="text-3xl font-semibold text-gray-800 dark:text-gray-200">12</p>
            </div>
            <div class="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
              <svg class="w-6 h-6 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path>
              </svg>
            </div>
          </div>
        </div>

        <div class="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <div class="flex items-center">
            <div class="flex-1">
              <h3 class="text-lg font-medium text-gray-900 dark:text-white">Active Tasks</h3>
              <p class="text-3xl font-semibold text-gray-800 dark:text-gray-200">8</p>
            </div>
            <div class="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center">
              <svg class="w-6 h-6 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"></path>
              </svg>
            </div>
          </div>
        </div>

        <div class="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <div class="flex items-center">
            <div class="flex-1">
              <h3 class="text-lg font-medium text-gray-900 dark:text-white">Team Members</h3>
              <p class="text-3xl font-semibold text-gray-800 dark:text-gray-200">6</p>
            </div>
            <div class="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center">
              <svg class="w-6 h-6 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"></path>
              </svg>
            </div>
          </div>
        </div>

        <div class="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <div class="flex items-center">
            <div class="flex-1">
              <h3 class="text-lg font-medium text-gray-900 dark:text-white">Completion Rate</h3>
              <p class="text-3xl font-semibold text-gray-800 dark:text-gray-200">85%</p>
            </div>
            <div class="w-12 h-12 bg-yellow-100 dark:bg-yellow-900 rounded-full flex items-center justify-center">
              <svg class="w-6 h-6 text-yellow-600 dark:text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
              </svg>
            </div>
          </div>
        </div>
      </div>

      <!-- Charts and Map Section -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <!-- Projects Timeline Chart -->
        <div class="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <div id="projectsChart" style="height: 300px;"></div>
        </div>

        <!-- Tasks Distribution Chart -->
        <div class="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <div id="tasksChart" style="height: 300px;"></div>
        </div>

        <!-- Team Activity Chart -->
        <div class="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <div id="teamChart" style="height: 300px;"></div>
        </div>

        <!-- Completion Trend Chart -->
        <div class="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <div id="completionChart" style="height: 300px;"></div>
        </div>
      </div>

      <!-- Team Map -->
      <div class="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <h2 class="text-lg font-medium text-gray-900 dark:text-white mb-4">Team Locations</h2>
        <div id="teamMap" style="height: 400px;"></div>
      </div>
    </div>
  `
})
export class HomeComponent implements OnInit {
  private map!: L.Map;
  private projectsChart: any;
  private tasksChart: any;
  private teamChart: any;
  private completionChart: any;

  get appLanguage(): Direction {
    return this.translationService.getCurrentLang() === SystemLanguage.ENGLISH ? 'ltr' : 'rtl';
  }

  constructor(private translationService: TranslationService) {
  }

  ngOnInit() {
    this.initCharts();
    this.initMap();
  }

  private initCharts() {
    // Projects Timeline Chart
    this.projectsChart = Highcharts.chart('projectsChart', {
      chart: { type: 'line', backgroundColor: 'transparent' },
      title: { text: 'Projects Timeline', style: { color: 'var(--text-primary, #1f2937)', fontFamily: 'Roboto-Bold' } },
      xAxis: {
        categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        labels: { style: { color: 'var(--text-secondary, #9ca3af)' } },
        lineColor: 'var(--border-color, #4b5563)',
        gridLineColor: 'var(--grid-line-color, #374151)'
      },
      yAxis: {
        title: { text: 'Number of Projects', style: { color: 'var(--text-secondary, #9ca3af)' } },
        labels: { style: { color: 'var(--text-secondary, #9ca3af)' } },
        gridLineColor: 'var(--grid-line-color, #374151)'
      },
      series: [{
        type: 'line',
        name: 'Projects',
        data: [4, 6, 8, 10, 12, 15],
        color: 'var(--primary-color, #3b82f6)'
      }],
      legend: {
        itemStyle: { color: 'var(--text-secondary, #9ca3af)' }
      }
    });

    // Tasks Distribution Chart
    this.tasksChart = Highcharts.chart('tasksChart', {
      chart: { type: 'pie', backgroundColor: 'transparent' },
      title: { text: 'Tasks Distribution', style: { color: 'var(--text-primary, #1f2937)' } },
      series: [{
        type: 'pie',
        name: 'Tasks',
        data: [
          { name: 'Completed', y: 45, color: 'var(--success-color, #10b981)' },
          { name: 'In Progress', y: 30, color: 'var(--primary-color, #3b82f6)' },
          { name: 'Pending', y: 25, color: 'var(--danger-color, #ef4444)' }
        ]
      }],
      plotOptions: {
        pie: {
          dataLabels: {
            style: { color: 'var(--text-secondary, #9ca3af)' }
          }
        }
      },
      legend: {
        itemStyle: { color: 'var(--text-secondary, #9ca3af)' }
      }
    });

    // Team Activity Chart
    this.teamChart = Highcharts.chart('teamChart', {
      chart: { type: 'column', backgroundColor: 'transparent' },
      title: { text: 'Team Activity', style: { color: 'var(--text-primary, #1f2937)' } },
      xAxis: {
        categories: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
        labels: { style: { color: 'var(--text-secondary, #9ca3af)' } },
        lineColor: 'var(--border-color, #4b5563)',
        gridLineColor: 'var(--grid-line-color, #374151)'
      },
      yAxis: {
        title: { text: 'Tasks Completed', style: { color: 'var(--text-secondary, #9ca3af)' } },
        labels: { style: { color: 'var(--text-secondary, #9ca3af)' } },
        gridLineColor: 'var(--grid-line-color, #374151)'
      },
      series: [{
        type: 'column',
        name: 'Tasks',
        data: [5, 8, 6, 9, 7],
        color: 'var(--accent-color, #8b5cf6)'
      }],
      legend: {
        itemStyle: { color: 'var(--text-secondary, #9ca3af)' }
      }
    });

    // Completion Trend Chart
    this.completionChart = Highcharts.chart('completionChart', {
      chart: { type: 'area', backgroundColor: 'transparent' },
      title: { text: 'Completion Trend', style: { color: 'var(--text-primary, #1f2937)' } },
      xAxis: {
        categories: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
        labels: { style: { color: 'var(--text-secondary, #9ca3af)' } },
        lineColor: 'var(--border-color, #4b5563)',
        gridLineColor: 'var(--grid-line-color, #374151)'
      },
      yAxis: {
        title: { text: 'Completion Rate (%)', style: { color: 'var(--text-secondary, #9ca3af)' } },
        labels: { style: { color: 'var(--text-secondary, #9ca3af)' } },
        gridLineColor: 'var(--grid-line-color, #374151)'
      },
      series: [{
        type: 'area',
        name: 'Rate',
        data: [65, 75, 80, 85],
        color: 'var(--warning-color, #f59e0b)',
        fillOpacity: 0.3
      }],
      legend: {
        itemStyle: { color: 'var(--text-secondary, #9ca3af)' }
      }
    });
  }

  private initMap() {
    delete (L.Icon.Default.prototype as any)._getIconUrl;
    L.Icon.Default.mergeOptions({
      iconRetinaUrl: 'assets/leaflet/images/marker-icon-2x.png',
      iconUrl: 'assets/leaflet/images/marker-icon.png',
      shadowUrl: 'assets/leaflet/images/marker-shadow.png'
    });
    this.map = L.map('teamMap').setView([30.0444, 31.2357], 6); // Cairo coordinates
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors'
    }).addTo(this.map);

    // Add team member markers for Egyptian cities
    const teamLocations = [
      { lat: 30.0444, lng: 31.2357, name: 'القاهرة - المقر الرئيسي' },
      { lat: 31.2001, lng: 29.9187, name: 'الإسكندرية - فريق أ' },
      { lat: 27.1783, lng: 31.1859, name: 'أسيوط - فريق ب' }
    ];

    teamLocations.forEach(location => {
      L.marker([location.lat, location.lng])
        .bindPopup(location.name)
        .addTo(this.map);
    });
  }
}
