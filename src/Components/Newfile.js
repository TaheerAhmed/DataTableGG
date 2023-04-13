// const startDate = useSelector(state => state.date.startDate)
//     const endDate=useSelector(state=>state.date.endDate)

//     useEffect(() => {
//     const fetchData = async () => {
//         if (startDate!=="" && endDate!==""){
//         axios.get(`http://go-dev.greedygame.com/v3/dummy/report?startDate=${startDate}&endDate=${endDate}`)
//         .then(res => {
//           console.log(res.data.data)
//           setdata(res.data.data)
//         })}}
//         try {
//             fetchData()
//         } catch (error) {
//             console.log(error)
//         }
//     }, [startDate,endDate])




 const formatData = (inputData, data) => {
            return inputData.map((item) => {
                let formattedItem = {};
                data
                    .filter((field) => field.available)
                    .sort((a, b) => a.order - b.order)
                    .forEach((field) => {
                        switch (field.id) {
                            case "Date":
                                formattedItem[field.service_name] = formatDate(item.date);
                                break;
                            case "App Name":
                                formattedItem[field.service_name] = item.app_id;
                                break;
                            case "AD Request":
                                formattedItem[field.service_name] = item.requests;
                                break;
                            case "AD Response":
                                formattedItem[field.service_name] = item.responses;
                                break;
                            case "Impression":
                                formattedItem[field.service_name] = item.impressions;
                                break;
                            case "Clicks":
                                formattedItem[field.service_name] = item.clicks;
                                break;
                            case "Revenue":
                                formattedItem[field.service_name] =Number( (item.revenue).toFixed(2));
                                break;
                            case "Fill Rate":
                                formattedItem[field.service_name] = Number((
                                    (item.responses / item.requests) *
                                    100
                                ).toFixed(2));
                                break;
                            case "CTR":
                                formattedItem[field.service_name] = Number(
                                    ((item.clicks / item.impressions) * 100).toFixed(2)
                                );
                                break;
                            default:
                                break;
                        }
                    });
                return formattedItem;
            });
        };