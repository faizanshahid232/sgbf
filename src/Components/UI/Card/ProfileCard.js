import { Box, Grid, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Logo from '../../logo/index';

const ProfileCard = ({ item }) => {
    const { id } = useParams();
    const [data, setData] = useState(null);
    console.log(id)
    useEffect(() => {
        if (id === undefined) {
            setData(item)
        }

    }, [id])
    return (
        <Grid container spacing={2} p={4}>
            <Grid item xs={6}>
                <Logo />
            </Grid>
            <Grid item xs={6}>
                <Box
                    component="img"
                    src={data?.profilePic}
                />
            </Grid>
            <Grid item xs={12}>
                <Typography variant='h2' sx={{ color: 'gray' }}>{data?.firstName}{" "}{data?.lastName}</Typography>
            </Grid>
            <Grid item xs={3}>
                <Typography variant='body1' sx={{ color: '#C0C0C0', fontSize: '24px' }}>Membership #</Typography>
            </Grid>
            <Grid item xs={9}>
                <Typography variant='body1' sx={{ color: '#C0C0C0', fontSize: '24px' }}>Membership #</Typography>
            </Grid>
            <Grid item xs={3}>
                <Typography variant='body1' sx={{ color: '#C0C0C0', fontSize: '24px' }}>Member Since :</Typography>
            </Grid>
            <Grid item xs={9}>
                <Typography variant='body1' sx={{ color: '#C0C0C0', fontSize: '24px' }}>Membership #</Typography>
            </Grid>
            <Grid item xs={3}>
                <Typography variant='body1' sx={{ color: '#C0C0C0', fontSize: '24px' }}>Valid Until :</Typography>
            </Grid>
            <Grid item xs={9}>
                <Typography variant='body1' sx={{ color: '#C0C0C0', fontSize: '24px' }}>Membership #</Typography>
            </Grid>
        </Grid>
    )
}

export default ProfileCard