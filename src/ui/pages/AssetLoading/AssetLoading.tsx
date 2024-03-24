import { useContext, useEffect, useState } from "react";
import { LoadingBar } from "../../components/molecules/LoadingBar/LoadingBar";

import './AssetLoading.scss'
import { AssetLoadingContext } from "../../context/AssetLoadingContext";
import { useInterval } from "../../hooks/useInterval";

export function AssetLoading() {

  const assets = useContext(AssetLoadingContext)
  const [loaded, setLoaded] = useState<number>(0)
  const clearInterval = useInterval(() => {
    setLoaded(assets.loaded())
  }, 100) 

  useEffect(() => clearInterval, [])

  return (
    <div className="asset-loading">
      <LoadingBar progress={loaded} />
    </div>
  )
}