import CardLogro from '../../common/CardLogro/CardLogro'
import { useTranslation } from 'react-i18next';

const UltimosLogros = ({lastUserAchievements}) => {
 const { t } = useTranslation();

    return (<>
        <span className="text-largeB py-5  lg:text-3extra font-semibold lg:pb-8 text-marron-grisaceo dark:text-blanco">{t('logrosDesbloqueados')} </span>
        <div className="grid grid-row-flow-dense gap-4 w-full md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {/*{lastUserAchievements.map((obj,ind)=>(
                <CardLogro obj={obj} key={ind} />
            ))}*/}
            {lastUserAchievements.map((achievement, index) => (
                <CardLogro achievement={achievement} key={index} />
            ))}
        </div>
    </>)
       
}

export default UltimosLogros