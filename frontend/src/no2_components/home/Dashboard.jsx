import React from 'react';
import { 
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Tooltip,
    Legend
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { useDashboard } from '../../no3_store/hooks/useDashboard';

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

const Dashboard = () => {
    // 기본값을 빈 배열/객체로 주거나, 아래에서 옵셔널 체이닝(?.)을 사용해 에러를 방지합니다.
    const { kpi, userRanking = [], productRanking = [] } = useDashboard();
    
    // 차트 공통 전역 설정 수정 (더 쌈뽕하게)
    ChartJS.defaults.color = '#8898aa'; // 전체 글꼴 색상
    ChartJS.defaults.font.family = "'Noto Sans KR', sans-serif";

    const userChartData = {
        labels: userRanking.map(item => item.name),
        datasets: [
            {
                label: "구매 건수",
                data: userRanking.map(item => item.count),
                backgroundColor: 'rgba(54, 162, 235, 0.7)', // 약간 더 진하게
                borderColor: 'rgb(54, 162, 235)',
                borderWidth: 1,
                borderRadius: 6, // 막대 끝 둥글게
                barPercentage: 0.8, // 막대 굵기
            }
        ]
    };
    
    const productChartData = {
        labels: productRanking.map(item => item.name),
        datasets: [
            {
                label: "판매 수량",
                data: productRanking.map(item => item.quantity),
                backgroundColor: 'rgba(255, 99, 132, 0.7)', // 약간 더 진하게
                borderColor: 'rgb(255, 99, 132)',
                borderWidth: 1,
                borderRadius: 6, // 막대 끝 둥글게
                barPercentage: 0.8,
            }
        ]
    };
    
    const chartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        indexAxis: "y",
        plugins: {
            legend: {
                display: false, // 카드의 자체 제목이 있으므로 범례는 숨김 (깔끔)
            },
            tooltip: { // 툴팁 디자인 수정
                backgroundColor: '#1a1c23',
                titleFont: { size: 14 },
                bodyFont: { size: 13 },
                padding: 10,
                cornerRadius: 8,
                displayColors: false,
            }
        },
        scales: { // 축 디자인 수정
            x: {
                grid: { display: false, drawBorder: false }, // X축 그리드 숨김
                ticks: { beginAtZero: true }
            },
            y: {
                grid: { color: '#f1f3f5', drawBorder: false }, // 연한 Y축 그리드
                ticks: { font: { weight: '500' } }
            }
        }
    };

    // kpi 데이터가 아직 로드되지 않았을 경우를 대비한 방어 코드
    if (!kpi) return (
        <div style={{...styles.dashboardContainer, display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
            <div style={{fontSize: '18px', color: '#8898aa'}}>데이터를 불러오는 중입니다...</div>
        </div>
    );

    // KPI 카드 데이터를 배열로 만들어 맵핑 (코드 단축)
    const kpiItems = [
        { title: "총 매출액", value: `${kpi.totalSalesAmount?.toLocaleString()}원`, color: '#313160' },
        { title: "총 판매수량", value: `${kpi.totalQuantity?.toLocaleString()}건`, color: '#2dce89' }, // 초록색 포인트
        { title: "총 주문건수", value: `${kpi.totalOrderCount?.toLocaleString()}건`, color: '#5e72e4' }, // 파란색 포인트
        { title: "고객 수", value: `${kpi.CustomersAmount?.toLocaleString()}명`, color: '#fb6340' }, // 주황색 포인트
        { title: "상품 수", value: `${kpi.ProductCount?.toLocaleString()}개`, color: '#11cdef' }, // 하늘색 포인트
    ];

    return (
        <div style={styles.dashboardContainer}>
            <div style={styles.pageHeader}>비즈니스 현황 요약</div>

            {/* KPI 섹션 */}
            <div style={styles.kpiGrid}>
                {kpiItems.map((item, index) => (
                    <div key={index} style={styles.kpiCard}
                        onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-5px)'}
                        onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}>
                        <div style={styles.kpiTitle}>{item.title}</div>
                        <div style={{...styles.kpiValue, color: item.color}}>{item.value}</div>
                    </div>
                ))}
            </div>
            
            {/* 차트 섹션 */}
            <div style={styles.chartsGrid}>
                {/* 유저 차트 */}
                <div style={styles.chartCard}>
                    <div style={styles.chartHeader}>
                        <div style={styles.chartTitle}>고객 구매 랭킹 TOP 10</div>
                        <div style={styles.chartSubTitle}>주문 건수 기준</div>
                    </div>
                    <div style={styles.chartWrapper}>
                        <Bar data={userChartData} options={chartOptions}/>
                    </div>
                </div>

                {/* 상품 차트 */}
                <div style={styles.chartCard}>
                    <div style={styles.chartHeader}>
                        <div style={styles.chartTitle}>상품 판매 랭킹 TOP 10</div>
                        <div style={styles.chartSubTitle}>판매 수량 기준</div>
                    </div>
                    <div style={styles.chartWrapper}>
                        <Bar data={productChartData} options={chartOptions}/>
                    </div>
                </div>
            </div>
        </div>
    );
}

// 인라인 스타일 객체 (가독성을 위해 컴포넌트 하단으로 분리)
const styles = {
    dashboardContainer: {
        padding: '24px',
        backgroundColor: '#f4f7f6', // 아주 연한 회색 배경
        minHeight: '100vh',
        fontFamily: "'Noto Sans KR', sans-serif",
    },
    pageHeader: {
        marginBottom: '24px',
        fontSize: '24px',
        fontWeight: 'bold',
        color: '#333',
    },
    kpiGrid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(5, 1fr)', // 5컬럼 그리드
        gap: '16px',
        marginBottom: '24px',
    },
    kpiCard: {
        backgroundColor: '#fff',
        padding: '20px',
        borderRadius: '12px',
        boxShadow: '0 4px 6px rgba(0,0,0,0.05)', // 은은한 그림자
        border: '1px solid #e1e8ed',
        transition: 'transform 0.2s ease', // 호버 효과
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
    },
    kpiTitle: {
        fontSize: '14px',
        color: '#8898aa', // 보조 텍스트 색상
        marginBottom: '8px',
        fontWeight: '500',
    },
    kpiValue: {
        fontSize: '20px',
        fontWeight: 'bold',
        color: '#32325d',
    },
    chartsGrid: {
        display: 'grid',
        gridTemplateColumns: '1fr 1fr', // 2컬럼 그리드
        gap: '24px',
    },
    chartCard: {
        backgroundColor: '#fff',
        padding: '24px',
        borderRadius: '12px',
        boxShadow: '0 4px 6px rgba(0,0,0,0.05)',
        border: '1px solid #e1e8ed',
    },
    chartHeader: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '16px',
        paddingBottom: '12px',
        borderBottom: '1px solid #f1f3f5',
    },
    chartTitle: {
        fontSize: '18px',
        fontWeight: '600',
        color: '#32325d',
    },
    chartSubTitle: {
        fontSize: '12px',
        color: '#8898aa',
    },
    chartWrapper: {
        height: '350px', // 차트 높이
        position: 'relative',
    }
};

export default Dashboard;