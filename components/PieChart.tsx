import { useContext } from "react";
import { Dimensions } from "react-native";
import { DataContext } from "./DataProvider";
import { PieChart } from 'react-native-chart-kit';


const PieChartWallet = () => {
    const screenWidth = Dimensions.get('window').width;
    const { walletData } = useContext(DataContext);

    // Chart configuration
    const chartConfig = {
        backgroundGradientFrom: "#1E2923",
        backgroundGradientFromOpacity: 0,
        backgroundGradientTo: "#08130D",
        backgroundGradientToOpacity: 0.5,
        color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
        strokeWidth: 2,
        barPercentage: 0.5,
        useShadowColorFromDataset: false
    };
    return (
        <>
            <PieChart
                data={walletData}
                width={screenWidth - 75}
                height={220}
                chartConfig={chartConfig}
                accessor={"balance"}
                backgroundColor={"transparent"}
                paddingLeft='15'
            />
        </>
    )
}
export default PieChartWallet;