import { useAllGetUser } from "./useUser";
import { useAllGetProduct } from "./useProduct";
import { useAllGetSales } from "./useSales";
import { useMemo } from "react";

export const useDashboard = () => {
    const { data: salesList = [] } = useAllGetSales();
    const { data: productList = [] } = useAllGetProduct();
    const { data: userList = [] } = useAllGetUser();

    // 핵심 성과 지표
    const kpi = useMemo(() => {
        // 총매출액
        const totalSalesAmount = salesList.reduce((sum, item) => (
            sum + Number(item.total_price)
        ), 0);
        
        // 판매건수 (주문 횟수)
        const totalOrderCount = salesList.length;
        
        // 판매수량
        const totalQuantity = salesList.reduce((sum, item) => (
            sum + Number(item.quantity)
        ), 0);
        
        // 고객수 & 상품수
        const customerCount = userList.length;
        const productCount = productList.length;
        
        return {
            totalOrderCount, 
            totalQuantity, 
            totalSalesAmount,
            // Dashboard.jsx 화면에서 사용하는 변수명으로 매핑 변경
            CustomersAmount: customerCount, 
            ProductCount: productCount 
        };
    }, [salesList, productList, userList]);
    
    // 고객 랭킹
    const userRanking = useMemo(() => {
        const obj = {};
        salesList.forEach(item => {
            obj[item.user_id] = (obj[item.user_id] || 0) + 1;
        });
        
        const userRankingObj = Object.entries(obj)
            .map(([userId, count]) => {
                const user = userList.find(user => String(user.id) === String(userId));
                return {
                    name: user?.name || "unknown",
                    count
                };
            })
            .sort((a, b) => b.count - a.count) // 내림차순
            .slice(0, 10); // 랭킹 10명
            
        return userRankingObj;
    }, [salesList, userList]);

    // 상품 랭킹
    const productRanking = useMemo(() => {
        const obj = {};
        
        salesList.forEach(item => {
            // 주문 건수가 아닌 '총 판매 수량'을 구하기 위해 item.quantity를 더함
            // (만약 데이터에 quantity가 없고 무조건 1개씩 팔린다면 + 1 로 돌려놓으시면 됩니다)
            obj[item.product_id] = (obj[item.product_id] || 0) + Number(item.quantity || 1);
        });
        
        const productRankingObj = Object.entries(obj)
            // 🚨 오타 수정 부분: pruductId -> productId
            .map(([productId, quantity]) => {
                const product = productList.find(product => String(product.id) === String(productId));
                return {
                    name: product?.product_name || "unknown",
                    quantity
                };
            })
            .sort((a, b) => b.quantity - a.quantity) // 내림차순
            .slice(0, 10); // 랭킹 10명
            
        return productRankingObj;
    }, [salesList, productList]);

    return {
        kpi,
        userRanking,
        productRanking
    };
};