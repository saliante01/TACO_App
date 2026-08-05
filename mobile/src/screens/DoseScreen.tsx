import { useState, useRef, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Animated,
  LayoutAnimation,
  Platform,
  UIManager,
} from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { colors } from '../theme';
import AnimatedCard from '../components/AnimatedCard';

if (
  Platform.OS === 'android' &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const DAYS = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];

const MOCK_MONTH = [
  { day: 1, dose: '1', weekday: 6 },
  { day: 2, dose: '1', weekday: 0 },
  { day: 3, dose: '½', weekday: 1 },
  { day: 4, dose: '1', weekday: 2 },
  { day: 5, dose: '1', weekday: 3 },
  { day: 6, dose: '½', weekday: 4 },
  { day: 7, dose: '0', weekday: 5 },
  { day: 8, dose: '1', weekday: 6 },
  { day: 9, dose: '1', weekday: 0 },
  { day: 10, dose: '½', weekday: 1 },
  { day: 11, dose: '1', weekday: 2 },
  { day: 12, dose: '1', weekday: 3 },
  { day: 13, dose: '½', weekday: 4 },
  { day: 14, dose: '0', weekday: 5 },
  { day: 15, dose: '1', weekday: 6 },
  { day: 16, dose: '1', weekday: 0 },
  { day: 17, dose: '½', weekday: 1 },
  { day: 18, dose: '1', weekday: 2 },
  { day: 19, dose: '1', weekday: 3 },
  { day: 20, dose: '½', weekday: 4 },
  { day: 21, dose: '0', weekday: 5 },
  { day: 22, dose: '1', weekday: 6 },
  { day: 23, dose: '1', weekday: 0 },
  { day: 24, dose: '½', weekday: 1 },
  { day: 25, dose: '1', weekday: 2 },
  { day: 26, dose: '1', weekday: 3 },
  { day: 27, dose: '½', weekday: 4 },
  { day: 28, dose: '0', weekday: 5 },
  { day: 29, dose: '1', weekday: 6 },
  { day: 30, dose: '1', weekday: 0 },
  { day: 31, dose: '½', weekday: 1 },
];

function getDoseColor(dose: string) {
  if (dose === '0') return colors.inactive;
  if (dose === '½') return colors.warning;
  return colors.secondary;
}

function getDoseLabel(dose: string) {
  if (dose === '0') return 'Sin dosis';
  if (dose === '½') return '½ pastilla';
  return `${dose} pastilla`;
}

export default function DoseScreen() {
  const today = 15;
  const [selectedDay, setSelectedDay] = useState(today);
  const [showInfo, setShowInfo] = useState(false);
  const pulseAnim = useRef(new Animated.Value(1)).current;

  const pulse = useCallback(() => {
    Animated.sequence([
      Animated.timing(pulseAnim, {
        toValue: 1.05,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(pulseAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const handleDayPress = useCallback((day: number) => {
    setSelectedDay(day);
    requestAnimationFrame(() => {
      pulse();
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    });
  }, [pulse]);

  const selected = MOCK_MONTH.find((d) => d.day === selectedDay);

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <AnimatedCard delay={100}>
        <View style={styles.monthHeader}>
          <Ionicons name="chevron-back" size={22} color={colors.text} />
          <Text style={styles.monthTitle}>Julio 2026</Text>
          <Ionicons name="chevron-forward" size={22} color={colors.text} />
        </View>

        <View style={styles.weekDays}>
          {DAYS.map((d) => (
            <Text key={d} style={styles.weekDayText}>{d}</Text>
          ))}
        </View>

        <View style={styles.daysGrid}>
          {MOCK_MONTH.map((d) => (
            <TouchableOpacity
              key={d.day}
              onPress={() => handleDayPress(d.day)}
              style={[
                styles.dayCell,
                selectedDay === d.day && styles.dayCellSelected,
              ]}
            >
              <Text
                style={[
                  styles.dayNumber,
                  selectedDay === d.day && styles.dayNumberSelected,
                ]}
              >
                {d.day}
              </Text>
              <View
                style={[
                  styles.doseDot,
                  { backgroundColor: getDoseColor(d.dose) },
                  selectedDay === d.day && styles.doseDotSelected,
                ]}
              />
            </TouchableOpacity>
          ))}
        </View>
      </AnimatedCard>

      {selected && (
        <AnimatedCard
          delay={200}
          style={{ transform: [{ scale: pulseAnim }] }}
        >
          <TouchableOpacity onPress={() => setShowInfo(!showInfo)} activeOpacity={0.8}>
            <View style={styles.selectedDoseRow}>
              <View>
                <Text style={styles.selectedDayLabel}>
                  {selectedDay} de julio de 2026
                </Text>
                <Text style={styles.selectedDoseValue}>
                  {getDoseLabel(selected.dose)}
                </Text>
              </View>
              <View style={[styles.selectedDoseCircle, { backgroundColor: getDoseColor(selected.dose) + '20' }]}>
                <Text style={[styles.selectedDoseCircleText, { color: getDoseColor(selected.dose) }]}>
                  {selected.dose}
                </Text>
              </View>
            </View>
            {showInfo && (
              <View style={styles.doseInfoPanel}>
                <View style={styles.doseInfoRow}>
                  <Ionicons name="time" size={16} color={colors.textSecondary} />
                  <Text style={styles.doseInfoText}>Tomar después del desayuno</Text>
                </View>
                <View style={styles.doseInfoRow}>
                  <Ionicons name="medkit" size={16} color={colors.textSecondary} />
                  <Text style={styles.doseInfoText}>
                    {selected.dose === '0' ? 'Día de descanso' : `Warfarina 5mg — ${getDoseLabel(selected.dose)}`}
                  </Text>
                </View>
              </View>
            )}
          </TouchableOpacity>
        </AnimatedCard>
      )}

      <AnimatedCard delay={300}>
        <Text style={styles.summaryTitle}>Resumen del mes</Text>
        <View style={styles.summaryRow}>
          <View style={styles.summaryItem}>
            <Text style={styles.summaryValue}>22</Text>
            <Text style={styles.summaryLabel}>Dosis completas</Text>
          </View>
          <View style={styles.summaryDivider} />
          <View style={styles.summaryItem}>
            <Text style={styles.summaryValue}>4</Text>
            <Text style={styles.summaryLabel}>Descansos</Text>
          </View>
          <View style={styles.summaryDivider} />
          <View style={styles.summaryItem}>
            <Text style={styles.summaryValue}>5</Text>
            <Text style={styles.summaryLabel}>½ dosis</Text>
          </View>
        </View>
      </AnimatedCard>

      <View style={{ height: 32 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  monthHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  monthTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
  },
  weekDays: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  weekDayText: {
    flex: 1,
    textAlign: 'center',
    fontSize: 12,
    color: colors.textSecondary,
    fontWeight: '500',
  },
  daysGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  dayCell: {
    width: '14.28%',
    alignItems: 'center',
    paddingVertical: 6,
    borderRadius: 8,
  },
  dayCellSelected: {
    backgroundColor: colors.primaryLight,
  },
  dayNumber: {
    fontSize: 14,
    color: colors.text,
    fontWeight: '500',
    marginBottom: 3,
  },
  dayNumberSelected: {
    color: colors.primary,
    fontWeight: '700',
  },
  doseDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  doseDotSelected: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  selectedDoseRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  selectedDayLabel: {
    fontSize: 14,
    color: colors.textSecondary,
    marginBottom: 4,
  },
  selectedDoseValue: {
    fontSize: 22,
    fontWeight: '700',
    color: colors.text,
  },
  selectedDoseCircle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  selectedDoseCircleText: {
    fontSize: 22,
    fontWeight: '700',
  },
  doseInfoPanel: {
    marginTop: 16,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    gap: 10,
  },
  doseInfoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  doseInfoText: {
    fontSize: 14,
    color: colors.textSecondary,
    flex: 1,
  },
  summaryTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 16,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  summaryItem: {
    alignItems: 'center',
  },
  summaryValue: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.primary,
  },
  summaryLabel: {
    fontSize: 12,
    color: colors.textSecondary,
    marginTop: 4,
  },
  summaryDivider: {
    width: 1,
    backgroundColor: colors.border,
  },
});
